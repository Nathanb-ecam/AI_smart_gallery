from django.db import models

class HumanImage(models.Model):
    image = models.ImageField(upload_to='persons')
    result_json = models.JSONField()
    cluster_group = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

class AnimalImage(models.Model):
    image = models.ImageField(upload_to='animal')
    result_json = models.JSONField()
    # cluster_group = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class OtherImage(models.Model):
    image = models.ImageField(upload_to='others')
    result_json = models.JSONField()
    # cluster_group = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
