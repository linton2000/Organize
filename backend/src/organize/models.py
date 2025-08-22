from django.db import models


class Session(models.Model):
    sessionId = models.BigAutoField(primary_key=True)
    startDate = models.DateTimeField(auto_now_add=True)
    endDate = models.DateTimeField()
    subject = models.CharField(max_length=30)

    def __str__(self) -> str:
        return f"Session ID: {self.sessionId}"
    