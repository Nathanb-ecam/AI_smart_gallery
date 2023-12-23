from django.urls import path
from .views import predict_image
from django.conf.urls.static import static
from django.conf import settings
from .views import get_gallery, cluster_human_images,modify_cluster_name

urlpatterns = [
    path('api/makeImagePrediction', predict_image, name='predict_image'),
    path('api/fetch_gallery/', get_gallery, name='get_gallery'),
    path('api/cluster_gallery/', cluster_human_images, name='cluster_human_images'),
    path('api/modify_cluster_name/<int:cluster_id>', modify_cluster_name, name='modify_cluster_name'),



]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


