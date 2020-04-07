from django.db import models

# Create your models here.
class Campaign(models.Model):
    id = models.AutoField(primary_key=True) # this field is automatic, but I put it in here to show where our primary key comes from
    title = models.TextField()
    description = models.TextField(blank=True)
    userFirst = models.TextField(blank=True)
    userLast = models.TextField(blank=True)
    donators = models.TextField()
    goal = models.TextField()
    currentAmount = models.TextField()
    daysActive = models.TextField()
    # daysCreated = models.TextField()
    status = models.TextField(blank=True)
    # hasBeneficiary = models.BooleanField(blank=True)
    imageUrl = models.TextField(blank=True)
    launchDate = models.TextField(blank=True)
    campaignHearts = models.TextField(blank=True)
    socialShareTotal = models.TextField(blank=True)
    percentComplete = models.TextField()
    percentCompleteForGivenDays = models.TextField()
    moneyPerDonor = models.TextField()
    quality = models.TextField()

class Predict(models.Model):
    id = models.AutoField(primary_key=True) # this field is automatic, but I put it in here to show where our primary key comes from
    title = models.TextField()
    description = models.TextField()
    goal = models.TextField()
    daysActive = models.TextField()
    hasBeneficiary = models.BooleanField()
    isCharity = models.BooleanField()
    visibleInSearch = models.BooleanField()
