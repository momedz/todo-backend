from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound
from django.core import serializers
from .models import Todo
import json

queryset = Todo.objects.all()


@csrf_exempt
def all(request):
    def get():
        result_json = json.loads(serializers.serialize('json', queryset))
        return JsonResponse(result_json, safe=False)

    def post():
        body = json.loads(request.body)
        queryset.create(
            title=body.get('title'),
            description=body.get('description')
        )
        return JsonResponse({
            'status': 'Created'
        }, status=201)

    if request.method == 'GET':
        return get()
    elif request.method == 'POST':
        return post()
    else:
        return HttpResponseNotFound()


@csrf_exempt
def by_id(request, id):
    def get():
        result_json = json.loads(serializers.serialize('json', queryset.filter(pk=id)))
        return JsonResponse(result_json, safe=False)

    def put():
        body = json.loads(request.body)
        queryset.filter(pk=id).update(
            title=body.get('title'),
            description=body.get('description')
        )
        return JsonResponse({
            'status': 'Success'
        })

    def delete():
        queryset.filter(pk=id).delete()
        return JsonResponse({
            'status': 'Success'
        })

    if request.method == 'GET':
        return get()
    elif request.method == 'PUT':
        return put()
    elif request.method == 'DELETE':
        return delete()
    else:
        return HttpResponseNotFound()


# Create your views here.
