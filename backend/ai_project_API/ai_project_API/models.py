from django.db import models

# class HumanImage(models.Model):
#     image = models.ImageField(upload_to='persons')
#     result_json = models.JSONField()
#     cluster_group = models.JSONField()
#     created_at = models.DateTimeField(auto_now_add=True)

# class AnimalImage(models.Model):
#     image = models.ImageField(upload_to='animal')
#     result_json = models.JSONField()
#     # cluster_group = models.IntegerField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)



class GalleryImage(models.Model):
    image = models.ImageField(upload_to='')
    result_json = models.JSONField()
    cluster_ids = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
