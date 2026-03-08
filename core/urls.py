from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('project/<slug:slug>/', views.project_detail, name='project_detail'),
    path('api/contact/', views.contact_submit, name='contact_submit'),
]
