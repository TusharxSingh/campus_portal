from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
class Teacher(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    designation = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"    
class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    semester = models.IntegerField()
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.code})"
    
class Room(models.Model):
    ROOM_TYPES = [
        ('Lab', 'Lab'),
        ('Theatre', 'Theatre'),
    ]

    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()
    type = models.CharField(max_length=20, choices=ROOM_TYPES)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name