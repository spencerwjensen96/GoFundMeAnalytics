from rest_framework import serializers
from api.models import Campaign, Predict
from rest_framework import routers, serializers, viewsets

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [ 'id', 'title', 'description', 'userFirst', 'userLast', 'donators', 'goal', 'currentAmount', 'daysActive', 'status', 'imageUrl', 'launchDate', 'campaignHearts', 'socialShareTotal', 'percentComplete', 'percentCompleteForGivenDays', 'moneyPerDonor', 'quality', 'locationCity', 'locationState', 'locationCountry' ]

class PredictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Predict
        fields = ['id', 'title', 'description', 'goal', 'daysActive', 'isCharity', 'hasBeneficiary', 'visibleInSearch']