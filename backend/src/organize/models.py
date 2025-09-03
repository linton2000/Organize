from django.db import models
from datetime import timedelta


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
        return (
            f"Session ID: {self.sessionId}, "
            f"Start: {self.startDate.strftime('%b %d, %Y %I:%M %p')}, " 
            f"Duration: {self.duration_mins} mins, " 
            f"Subject: {self.subject.name}"
        )

    @property
    def duration(self) -> timedelta:
        """Return the session duration as a timedelta, or None if missing dates."""
        if self.startDate and self.endDate:
            return self.endDate - self.startDate
        return None

    @property
    def duration_mins(self) -> int:
        """Duration in whole minutes (int)."""
        dur = self.duration
        return int(dur.total_seconds() // 60) if dur else None
    