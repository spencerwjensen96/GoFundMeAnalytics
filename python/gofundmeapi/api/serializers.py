from rest_framework import serializers
from api.models import Campaign
from rest_framework import routers, serializers, viewsets

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [ 'id', 'title', 'description', 'userFirst', 'userLast', 'donators', 'goal', 'currentAmount', 'daysActive', 'status', 'imageUrl', 'launchDate', 'campaignHearts', 'socialShareTotal', 'percentComplete', 'percentCompleteForGivenDays', 'moneyPerDonor', 'quality', ]