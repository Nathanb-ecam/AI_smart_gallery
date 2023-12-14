from django.urls import path
from .views import hello, root_path,predict_image
from django.conf.urls.static import static
from django.conf import settings
from .views import get_humans,get_animals,get_others

urlpatterns = [
    path('api/hello/', hello, name='hello'),
    path('api/', root_path, name='root_path'),
    path('api/makeImagePrediction', predict_image, name='predict_image'),
    path('api/fetch_humans/', get_humans, name='get_humans'),
    path('api/fetch_animals/', get_animals, name='get_animals'),
    path('api/fetch_others/', get_others, name='get_others'),
]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


