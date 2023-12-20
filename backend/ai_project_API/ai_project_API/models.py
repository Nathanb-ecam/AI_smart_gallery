from django.db import models

class ClusterNames(models.Model):
    cluster_id = models.IntegerField(primary_key=True)
    cluster_name = models.CharField(max_length=255)

class GalleryImage(models.Model):
    image = models.ImageField(upload_to='')
    result_json = models.JSONField()
    cluster_ids = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
