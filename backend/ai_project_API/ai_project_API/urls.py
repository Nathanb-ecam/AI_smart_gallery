from django.urls import path
from .views import hello, root_path,predict_image
from django.conf.urls.static import static
from django.conf import settings
from .views import get_gallery, cluster_human_images

urlpatterns = [
    path('api/hello/', hello, name='hello'),
    path('api/', root_path, name='root_path'),
    path('api/makeImagePrediction', predict_image, name='predict_image'),
    path('api/fetch_gallery/', get_gallery, name='get_gallery'),
    path('api/cluster_gallery/', cluster_human_images, name='cluster_human_images'),


]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


