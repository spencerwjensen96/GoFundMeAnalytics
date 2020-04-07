from django.db import models

# Create your models here.
class Campaign(models.Model):
    id = models.AutoField(primary_key=True) # this field is automatic, but I put it in here to show where our primary key comes from
    title = models.TextField()
    description = models.TextField(blank=True)
    userFirst = models.TextField(blank=True)
    userLast = models.TextField(blank=True)
    donators = models.IntegerField(primary_key=False)
    goal = models.IntegerField(primary_key=False)
    currentAmount = models.DecimalField(decimal_places=2, max_digits=7)
    daysActive = models.IntegerField(primary_key=False)
    # daysCreated = models.IntegerField(primary_key=False)
    status = models.BooleanField(blank=True)
    # hasBeneficiary = models.BooleanField(blank=True)
    imageUrl = models.TextField(blank=True)
    launchDate = models.TextField(blank=True)
    campaignHearts = models.IntegerField(blank=True)
    socialShareTotal = models.IntegerField(blank=True)
    percentComplete = models.DecimalField(decimal_places=2, max_digits=7)
    percentCompleteForGivenDays = models.DecimalField(decimal_places=2, max_digits=7)
    moneyPerDonor = models.DecimalField(decimal_places=2, max_digits=7)
    quality = models.TextField()