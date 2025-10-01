from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    SessionViewSet,
    SubjectViewSet,
    SummaryView,
    EndSessionView,
    ActiveSessionView,
)

router = DefaultRouter()
router.register(r'sessions', SessionViewSet)
router.register(r'subjectss', SubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('end-session/', EndSessionView.as_view(), name='end-session'),
    path('active-session/', ActiveSessionView.as_view(), name='active-session'),
    path('summary/', SummaryView.as_view(), name='summary')
]
