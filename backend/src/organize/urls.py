from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import SessionViewSet, SubjectViewSet, SummaryView

router = DefaultRouter()
router.register(r'sessions', SessionViewSet)
router.register(r'subjectss', SubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', SummaryView.as_view(), name='summary')
]
