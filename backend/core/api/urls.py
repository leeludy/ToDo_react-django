from rest_framework.routers import DefaultRouter
from todo.api.urls import todo_router
from django.urls import path, include

router = DefaultRouter()
# todo
router.registry.extend(todo_router.registry)

urlpatterns = [ 
    path('', include(router.urls))
] 

# add more apps router here