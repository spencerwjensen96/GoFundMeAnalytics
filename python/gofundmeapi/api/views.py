from django.shortcuts import render
import urllib
# Create your views here.
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import time
# If you are using Python 3+, import urllib instead of urllib2

import json 

# Create your views here.
class LoanTest(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        data =  {
        "Inputs": {
            "input1":
            {
                "ColumnNames": ["loan_status_numeric", "int_rate", "emp_length", "home_ownership", "annual_inc", "verification_status", "acc_now_delinq", "delinq_2yrs", "earliest_cr_line", "inq_last_6mths", "mths_since_last_delinq", "mths_since_last_record", "open_acc", "pub_rec", "revol_bal", "revol_util", "tot_coll_amt", "tot_cur_bal", "total_acc", "total_rev_hi_lim", "dti", "grade", "sub_grade"],
                "Values": [ [ "0", "0", "value", "value", "0", "value", "0", "0", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "value", "value" ], [ "0", "0", "value", "value", "0", "value", "0", "0", "", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "value", "value" ], ]
            },        },
        "GlobalParameters": {
        }
        }
        body = str.encode(json.dumps(data))
        url = 'https://ussouthcentral.services.azureml.net/workspaces/79b4b24bf3df4f82b129b81a8caceec6/services/6da19b3768e54c768d541a7186e06edd/execute?api-version=2.0&details=true'
        api_key = 'iyGYAmP8GKsxhCrKN3WPtRXdT1IeUzeTU6UzoFhXb/Z7m4keeGgdCLWRfcGLHOO/I4YQaxRswza9Kkjp/s5niQ==' # Replace this with the API key for the web service
        headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
        req = urllib.request.Request(url, body, headers) 
        try:
            response = urllib.request.urlopen(req)
            # If you are using Python 3+, replace urllib2 with urllib.request in the above code:
            # req = urllib.request.Request(url, body, headers) 
            # response = urllib.request.urlopen(req)
            result = response.read()
            print("\n\n\n")
            print(result) 
            print("\n\n\n")
        except urllib.HTTPError as error:
            print("The request failed with status code: " + str(error.code))
            # Print the headers - they include the requert ID and the timestamp, which are useful for debugging the failure
            print(error.info())
            print(json.loads(error.read()))