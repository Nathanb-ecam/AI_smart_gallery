
import cv2
import face_recognition
import os
import pickle
from sklearn.cluster import DBSCAN
import numpy as np
from .models import HumanImage


def make_encodings(imagePaths,pickle_file_path):
    imagePaths = list(map(lambda filename : filename[1:],imagePaths))
    data = []
    if os.path.getsize(pickle_file_path) > 0:
        with open(pickle_file_path, 'rb') as file:
            data = pickle.load(file)
    else:
        data = []

    print("[INFO] ENCODING faces...")

    for (i, imagePath) in enumerate(imagePaths):
        # load the input image and convert it from RGB (OpenCV ordering)
        # to dlib ordering (RGB)
        print(f"[INFO] processing image {i+1}/{len(imagePaths)}")
        # print(imagePath)
        try:
            image = cv2.imread(imagePath)
            rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            boxes = face_recognition.face_locations(rgb,model="hog")
            print(f"{len(boxes)} person(s) found in the image")
            
            # compute the facial embedding for the face
            encodings = face_recognition.face_encodings(rgb, boxes)
            # build a dictionary of the image path, bounding box location,and facial encodings for the current image
            d = [{"imagePath": imagePath, "loc": box, "encoding": enc} for (box, enc) in zip(boxes, encodings)]
            data.extend(d)
            print("[INFO] Image succesfully encoded to pickle file")

        except Exception as e:
            print("[ERROR] Image encoding went wrong ... ")
            print(e)

    with open(pickle_file_path, 'wb') as file:
        pickle.dump(data,file)

    print("[INFO] Updated encodings.pickle with new data.")
    print("\n\n\n")









def perform_clustering(pickle_file_path):
    try:
        print("[INFO] loading encodings...")
        if os.path.exists(pickle_file_path):

            data = pickle.loads(open(pickle_file_path, "rb").read())
            data = np.array(data)
            encodings = [d["encoding"] for d in data]

            print("[INFO] CLUSTERING...")
            clt = DBSCAN(metric="euclidean",eps=0.52, min_samples=2) # , n_jobs=args["jobs"]
            clt.fit(encodings)
            # determine the total number of unique faces found in the dataset
            labelIDs = np.unique(clt.labels_)
            # print("labelIDs",labelIDs)
            numUniqueFaces = len(np.where(labelIDs > -1)[0])
            print("[INFO] # unique faces: {}".format(numUniqueFaces))
            clusters = []
            for labelID in labelIDs:
                # find all indexes into the `data` array that belong to the
                # current label ID, then randomly sample a maximum of 25 indexes
                # from the set
                # print("[INFO] faces for face ID: {}".format(labelID))
                idxs = np.where(clt.labels_ == labelID)[0]
                idxs = np.random.choice(idxs, size=min(25, len(idxs)),replace=False)
                # initialize the list of faces to include in the montage
                faces = []

                for i in idxs:
                    current_img_path = data[i]["imagePath"]
                    current_img_path = current_img_path.replace("uploads/","")
                    print(f'Image {current_img_path} is in cluster n° {labelID}')

                    face_path = current_img_path
                    faces.append(face_path)


                clusters.append({"labelId":int(labelID),"face_paths":faces})

    
            # print("clusters", clusters)
            return clusters
        return Exception(f"Pickle file not found : {pickle_file_path}")

    except Exception as e:
        print("SOMETHING WENT WRONG IN CLUSTERING 'perform_clustering()'")
        print(e)
        return e