from django.db import models


class Subject(models.Model):
    name = models.CharField(primary_key=True, max_length=30)

    def __str__(self):
        return f"Subject: {self.name}"
    

class Session(models.Model):
    sessionId = models.BigAutoField(primary_key=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    subject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f"Session ID: {self.sessionId}"
    