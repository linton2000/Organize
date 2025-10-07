from django.contrib import admin
from django.db.models import Max, Count, F
from .models import Session, Subject

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ("sessionId", "startDate", "duration_mins", "subject_id")


class SessionInline(admin.TabularInline):
    model = Session
    extra = 0
    fields = ('admin_summary',)
    readonly_fields = ('admin_summary',)
    show_change_link = True
    ordering = ('-startDate',)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    inlines = [SessionInline]
    list_display = ("name", "isActive", "latest_start_admin", "session_count_admin")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        # sessions = related_name on Session.subject
        qs = qs.annotate(
            latest_start_admin=Max("sessions__startDate"),
            session_count_admin=Count("sessions")
        )
        return qs.order_by(F("latest_start_admin").desc(nulls_last=True))

    # Methods to surface annotations in list_display
    def latest_start_admin(self, obj):
        return obj.latest_start_admin
    latest_start_admin.short_description = "Latest Session Start"
    latest_start_admin.admin_order_field = "latest_start_admin"   # allows column sort

    def session_count_admin(self, obj):
        return obj.session_count_admin
    session_count_admin.short_description = "Total Sessions"
    session_count_admin.admin_order_field = "session_count_admin"
