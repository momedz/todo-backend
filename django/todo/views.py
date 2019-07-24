from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound
from django.core import serializers
from .models import Todo
import json

@csrf_exempt
def index(request):

    def http_get():
        result_json = json.loads(serializers.serialize('json', Todo.objects.all()))
        return JsonResponse(result_json, safe=False)

    def http_post():
        return JsonResponse({
            'request.method': request.method
        }, status=201)

    return {
        'GET': http_get(),
        'POST': http_post()
    }.get(request.method, HttpResponseNotFound())

# Create your views here.
