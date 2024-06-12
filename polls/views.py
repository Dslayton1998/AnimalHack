from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Question

def index(request):
    lastest_quetsion_list = Question.objects.order_by("-pub_date")[:5]

    return JsonResponse({
        "test": "test"
    })

def detail(request, question_id):
    return JsonResponse({"test": "You're looking at question %s." % question_id})

def results(request, question_id):
    response = "You're looking at the results of question %s"
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s" % question_id)