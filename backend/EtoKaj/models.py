from django.db import models

# Create your models here.

class EtoKaj(models.Model):
    taskTitle = models.CharField(max_length=100)
    groupId = models.CharField(max_length=100, null=True, blank=True)
    taskDescription = models.CharField(max_length=500)
    starred = models.BooleanField(default=False)
    
    completed = models.BooleanField(default=False)
    dateCreated = models.DateTimeField(auto_now_add=True)
    dateCompleted = models.DateTimeField(null=True, blank=True)
    
    
    def __str__(self) -> str:
        return super().__str__()
    
    