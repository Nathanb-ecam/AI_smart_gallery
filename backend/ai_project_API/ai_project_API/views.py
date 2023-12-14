from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

import cv2
import numpy as np

from .models import HumanImage,AnimalImage,OtherImage
from ai_project_API.ai_utils import make_encodings, perform_clustering

with open("ai_project_API/model_data/coco.names", "r") as f:
    YOLO_CLASSES = [line.strip() for line in f.readlines()]

PICKLE_FILE_PATH = "ai_project_API/model_data/encodings.pickle"
CLASSES_OF_INTEREST = ["person","cat","dog","bird","horse","sheep","cow","elephant","bear","zebra","giraffe"]



def hello(request):
    return HttpResponse("Hello, Django!")



def root_path(request):
    return HttpResponse("Ai project api")



def draw_element_informations(image,element_class_id,confidence,element_boundaries):
    element_class = YOLO_CLASSES[element_class_id]
    label = f"{element_class}: {confidence:.2f}"
    # print(label)
    (x,y,w,h) = element_boundaries
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    return element_class,confidence

@api_view(['GET'])
def get_humans(request):
    all_human_images = HumanImage.objects.all()
    # Serialize the objects to a JSON format
    serialized_human_images = [
        {
            'image_url': image.image.url,
            'filename': image.image.name,
            'result_json': image.result_json,
            'cluster_group': image.cluster_group,
            'created_at': image.created_at
        }
        for image in all_human_images
    ]
    return Response({'humans': serialized_human_images})

@api_view(['GET'])
def get_animals(request):
    all_animal_images = AnimalImage.objects.all()
    # Serialize the objects to a JSON format
    serialized_animal_images = [
        {
            'image_url': image.image.url,
            'filename': image.image.name,
            'result_json': image.result_json,
            # 'cluster_group': image.cluster_group,
            'created_at': image.created_at
        }
        for image in all_animal_images
    ]
    return Response({'animals': serialized_animal_images})

@api_view(['GET'])
def get_others(request):
    all_other_images = OtherImage.objects.all()
    # Serialize the objects to a JSON format
    serialized_other_images = [
        {
            'image_url': image.image.url,
            'filename': image.image.name,
            'result_json': image.result_json,
            # 'cluster_group': image.cluster_group,
            'created_at': image.created_at
        }
        for image in all_other_images
    ]
    return Response({'others': serialized_other_images})




@csrf_exempt
def predict_image(request):

    net = cv2.dnn.readNet("ai_project_API/model_data/yolov3.weights", "ai_project_API/model_data/yolov3.cfg")

    print("request.FILES",request.FILES)
    if 'image' in request.FILES:
        if request.method =='POST':
            uploaded_file = request.FILES['image']
                        
            try:
            # Attempt to decode the image
                image = cv2.imdecode(np.frombuffer(uploaded_file.read(), np.uint8), cv2.IMREAD_COLOR)

                if image is not None:
                    # print("Image dimensions after decoding:", image.shape)

                    # Preprocess image
                    blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)
                    net.setInput(blob)

                    # Get output layer names
                    layer_names = net.getUnconnectedOutLayersNames()

                    # Run forward pass
                    outs = net.forward(layer_names)
                else:
                    print("Error: Unable to decode the image.")
            except Exception as e:
                print("Error:", str(e))

        boxes = []
        confidences = []
        class_ids = []

        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]

                if confidence > 0.5:
                    center_x = int(detection[0] * image.shape[1])
                    center_y = int(detection[1] * image.shape[0])
                    w = int(detection[2] * image.shape[1])
                    h = int(detection[3] * image.shape[0])

                    x = int(center_x - w / 2)
                    y = int(center_y - h / 2)

                    # print(classes[class_id])
                    if YOLO_CLASSES[class_id] in CLASSES_OF_INTEREST:
                        class_ids.append(class_id)
                        boxes.append((x,y,w,h))
                        confidences.append(float(confidence))



        # Applying Non max to filter same object with mulitple detections
        indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5,0.4)
        all_results = []
        for i in indices:
            try:
                box = boxes[i]
            except:
                i = i[0]
                box = boxes[i]
            
            x = box[0]
            y = box[1]
            w = box[2]
            h = box[3]
            element_boundaries = (round(x),round(y),round(w),round(h))
            identified_class,confidence = draw_element_informations(image, class_ids[i], confidences[i], element_boundaries)
            all_results.append(identified_class)



        """ Then we want to store the image server side,
            save the detection result of the image and finally
            respond with the url of the image and the detection result
        """
        if("person" in all_results):
            detected_image = HumanImage(image=uploaded_file, result_json={"image-detection": all_results[0]})
            detected_image.save()
        elif (len(all_results)!=0) and ('person' not in all_results):
            # No humans so if there are items it should be animals
            detected_image = AnimalImage(image=uploaded_file, result_json={"image-detection": all_results[0]})
            detected_image.save()
        else:
            detected_image = OtherImage(image=uploaded_file, result_json={"image-detection": all_results[0]})
            detected_image.save()


        # if len(all_results)!=0:
        image_path = detected_image.image.url
        message = {"image-detection":all_results,"image_url":image_path}

        # 
        for element_class in all_results:
            if(element_class=='person'):
                print("[INFO] This image contains a person")
                print("[INFO] Need to process encodings")
                make_encodings(imagePaths=[image_path],pickle_file_path = PICKLE_FILE_PATH)
                perform_clustering("ai_project_API/model_data/encodings.pickle")



        return JsonResponse(message)
        # else:
            # return JsonResponse({"image-detection":"Nothing was identified in the image"})
    else:
        return JsonResponse({"error": "Only POST requests are allowed"})