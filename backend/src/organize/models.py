from datetime import timedelta
from django.db import models
from django.utils.html import format_html


class Subject(models.Model):
    name = models.CharField(primary_key=True, max_length=30)

    def __str__(self):
        return f"Subject: {self.name}"
    
    @property
    def session_count(self):
        return models.Count('sessions')
    
    @property
    def latest_session(self):
        return models.Max("sessions__endDate")
    

class Session(models.Model):
    sessionId = models.BigAutoField(primary_key=True)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    subject = models.ForeignKey(
        Subject, 
        on_delete=models.DO_NOTHING, 
        related_name='sessions')

    def __str__(self):
        return f"Session ID: {self.sessionId}"

    def admin_summary(self):
        return format_html(
            "<b>Start:</b> {} &nbsp; "
            "<b>Duration:</b> {} mins &nbsp; "
            "<b>Subject:</b> {}",
            self.startDate.strftime('%b %d, %Y %I:%M %p'),
            self.duration_mins if self.duration_mins is not None else '-',
            self.subject_id
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
        return max(0, int(dur.total_seconds() // 60)) if dur else None  # Using max() to guard against negative vals
    