from django.db import models

# Create your models here.
class Session(models.Model):
    sessionId = models.AutoField(primary_key=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    subject = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f"Session ID: {self.sessionId} \nStart Date: {self.startDate} \nEnd Date: {self.endDate} \nSubject: {self.subject}"