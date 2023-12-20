from django.urls import path
from .views import hello, root_path,predict_image
from django.conf.urls.static import static
from django.conf import settings
from .views import get_gallery, cluster_human_images,get_cluster_labels,add_cluster_name, modify_cluster_name

urlpatterns = [
    path('api/hello/', hello, name='hello'),
    path('api/', root_path, name='root_path'),
    path('api/makeImagePrediction', predict_image, name='predict_image'),
    path('api/fetch_gallery/', get_gallery, name='get_gallery'),
    path('api/cluster_gallery/', cluster_human_images, name='cluster_human_images'),
    path('api/cluster_names/', get_cluster_labels, name='get_cluster_labels'),
    path('api/add_cluster_name/', add_cluster_name, name='add_cluster_name'),
    path('api/modify_cluster_name/<int:cluster_id>', modify_cluster_name, name='modify_cluster_name'),



]


urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


