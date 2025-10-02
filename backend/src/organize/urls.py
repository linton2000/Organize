from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    SessionViewSet,
    SubjectViewSet,
    SummaryView,
    StartSessionView,
    EndSessionView,
    ActiveSessionView,
)

router = DefaultRouter()
router.register(r'session', SessionViewSet)
router.register(r'subject', SubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('start-session/', StartSessionView.as_view(), name='start-session'),
    path('end-session/', EndSessionView.as_view(), name='end-session'),
    path('active-session/', ActiveSessionView.as_view(), name='active-session'),
    path('summary/', SummaryView.as_view(), name='summary')
]
