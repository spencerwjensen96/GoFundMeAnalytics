# 3rd party imports
from django.shortcuts import render
import urllib
# If you are using Python 3+, import urllib instead of urllib2
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import time
# my imports
from api.serializers import CampaignSerializer, PredictSerializer
from api.models import Campaign

# Wow, the beautiful views you can see here.
class Campaigns(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        campaigns = Campaign.objects.all()
        if len(campaigns) > 0:
            # if len(campaigns) > 100:
            #     campaigns = Campaign.objects.filter()[:100]
            serializer = CampaignSerializer(campaigns, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Predict(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        predictions = Predict.objects.all()
        if len(predictions) > 0:
            serializer = PredictSerializer(predictions, many=True)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def post(self, request, format=None):
        serializer = PredictSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save() # add this as a prediction to our database

            # here's where we do the connection with azure
            azureData = {
                "Inputs": {
                    "input1": {
                        "ColumnNames": [
                            "Column 0", # line 45
                            "Unnamed: 0",
                            "url",
                            "campaign_id",
                            "auto_fb_post_mode",
                            "collected_date",
                            "category_id",
                            "category",
                            "currencycode",
                            "current_amount",
                            "goal", # +10
                            "donators",
                            "days_active", # +12
                            "days_created",
                            "title", # +14
                            "description", # +15
                            "default_url",
                            "has_beneficiary", # +17
                            "turn_off_donations",
                            "user_id",
                            "user_first_name",
                            "user_last_name",
                            "user_facebook_id",
                            "visible_in_search", # +23
                            "status",
                            "is_launched",
                            "campaign_image_url",
                            "created_at",
                            "launch_date",
                            "campaign_hearts",
                            "social_share_total",
                            "location_city",
                            "location_country",
                            "location_zip",
                            "is_charity", # +34
                            "charity_valid",
                            "Percent_complete",
                            "Percent_complete_forGivenDays",
                            "Money_Per_doner",
                            "Percent_completeLN",
                            "donatorsLN",
                            "campaign_heartsLN",
                            "social_share_totalLN",
                            "goalLN",
                            "current_amountLN",
                            "days_activeCR"
                        ],
                        "Values": [
                            [
                            "value",
                            "value",
                            "value",
                            "0",
                            "value",
                            "value",
                            "value",
                            "value",
                            "value",
                            "0",
                            request.data['goal'], # goals
                            "value",
                            request.data['daysActive'], # days active
                            "value",
                            request.data['title'], # title
                            request.data['description'], # description
                            "value",
                            request.data['hasBeneficiary'], # has beneficiary
                            "value",
                            "value",
                            "value",
                            "value",
                            "0",
                            request.data['visibleInSearch'], # visible in search
                            "0",
                            "value",
                            "value",
                            "value",
                            "value",
                            "0",
                            "0",
                            "value",
                            "value",
                            "value",
                            request.data['isCharity'], # is charity
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                            ]
                        ]
                    },
                },
                "GlobalParameters": {},
            }
            
            body = str.encode(json.dumps(azureData))
            url = 'https://ussouthcentral.services.azureml.net/workspaces/45e53529d44640cd9204978a414d57bb/services/fa1d27f8d0284203bcadeee6e530da62/execute?api-version=2.0&details=true'
            api_key = 'Tv58sTKmr1FAjJHlHi8/GTFQemljo1SMmG+p662OEAHVgpZl1Yi4Rf/Aeg9xCno8s9OSlc6isnyXTGamQw+bGw=='
            headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
            req = urllib.request.Request(url, body, headers) 
            try:
                response = urllib.request.urlopen(req)
                result = response.read()
                print("\n\n\n")
                print(result) 
                print("\n\n\n")
                return Response(result)
            except urllib.request.HTTPError as error:
                print("The request failed with status code: " + str(error.code))
                print(error.info())
                print(json.loads(error.read()))
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        else:    
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)