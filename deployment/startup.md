# Project Setup / Startup

## Backend

1. Install cmake

   ```shell
   brew install cmake
   ```

   \* because face_recognition module uses dlib

2. Installing all modules:

   ```shell
   python -m pip install -r requirements.txt
   ```

3. Setup database with:

   ```shell
   python manage.py makemigrations ai_project_API
   ```

   ```shell
   python manage.py migrate ai_project_API
   ```

4. Download the necessary yolov3 model files and put them in a new directory **model_data** under `backend/ai_project_API/ai_project_API`.

   The model_data directory should contain :

   - 'coco.names'
   - 'encodings.pickle' (simply create an empty file)
   - 'yolov3.cfg'
   - 'yolov3.weights'

5. Starting the server

   ```shell
   python manage.py runserver
   ```

## Frontend

1. Installing neccessary node_modules

   ```shell
   npm i
   ```

2. Start dev server

   ```shell
   npm run dev
   ```
