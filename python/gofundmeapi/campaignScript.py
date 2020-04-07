#initialize django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'gofundmeapi.settings'
import django
django.setup()

#normal imports
from api.models import Campaign
import csv
from decimal import Decimal

#create Campaign Objects, and add it to the database
def createCampaigns():
    with open('Cleaned_Campaigns_Encoded.csv', encoding='utf-8', errors='replace') as campCSV:
        data = csv.reader(campCSV, delimiter=',')
        
        # integer variables to access them in the rows (what array index are they stored at?)
        currentAmount = 9
        goal = 10
        donators = 11
        daysActive = 12
        title = 14
        description = 15
        userFirst = 20
        userLast = 21
        status = 24
        imageUrl = 26
        launchDate = 28
        campaignHearts = 29
        socialShareTotal = 30
        percentComplete = 36
        percentCompleteForGivenDays = 37
        moneyPerDonor = 38

        for row in data:
            # print("row: ")
            # print(row)
            if(row[1] != 'Unnamed: 0'): # this skips the first row, we don't want to save the headers to our database
                dbcamp = Campaign()
                dbcamp.currentAmount = Decimal(row[currentAmount])
                print('current amount', dbcamp.currentAmount)
                dbcamp.daysActive = int(Decimal(row[daysActive]))
                print('days active', dbcamp.daysActive)
                dbcamp.goal = int(row[goal])
                dbcamp.donators = int(row[donators])
                dbcamp.title = row[title]
                dbcamp.description = row[description]
                dbcamp.userFirst = row[userFirst]
                dbcamp.userLast = row[userLast]
                dbcamp.status = row[status] # if = 1 then true, if = 0 then false // I hope :)
                dbcamp.imageUrl = row[imageUrl]
                dbcamp.launchDate = row[launchDate]
                dbcamp.campaignHearts = int(row[campaignHearts])
                dbcamp.socialShareTotal = int(row[socialShareTotal])
                dbcamp.percentComplete = Decimal(row[percentComplete])
                dbcamp.percentCompleteForGivenDays = Decimal(row[percentCompleteForGivenDays])
                dbcamp.moneyPerDonor = Decimal(row[moneyPerDonor])
                dbcamp.save()
                print(dbcamp)

def main():
    createCampaigns()

#bootstrap
if __name__ == "__main__":
    main()