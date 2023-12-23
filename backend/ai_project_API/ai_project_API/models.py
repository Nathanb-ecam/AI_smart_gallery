from django.db import models


class GalleryImage(models.Model):
    image = models.ImageField(upload_to='')
    result_json = models.JSONField()
    cluster_info = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    # def update_cluster_id_key(self, key, new_cluster_name):
    #     key = str(key)
    #     if key in self.cluster_ids:
    #         self.cluster_ids[key] = new_cluster_name
    #         self.save()
