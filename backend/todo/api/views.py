from rest_framework.viewsets import ModelViewSet
from ..models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

@api_view(['GET', 'POST'])
def todo_list(request, format=None):

    if request.method == 'GET':
        TodoList = Todo.objects.all()
        serializer = TodoSerializer(TodoList, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, id, format=None):

    try:
        todo = Todo.objects.get(pk=id)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
