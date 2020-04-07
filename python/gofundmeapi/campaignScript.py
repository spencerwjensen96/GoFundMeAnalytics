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

        # number of rows that were unable to save to the database
        numFails = 0

        for row in data:
            # print("row: ")
            # try:
            #     print(row)
            # except:
            #     print("can't read unicode char probably is the error")
            if(row[1] != 'Unnamed: 0'): # this skips the first row, we don't want to save the headers to our database
                dbcamp = Campaign()
                dbcamp.currentAmount = Decimal(row[currentAmount])
                # print('current amount', dbcamp.currentAmount)
                dbcamp.daysActive = int(Decimal(row[daysActive]))
                # print('days active', dbcamp.daysActive)
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
                if dbcamp.percentComplete == 'Infinity':
                    print('percent complete = infinity error')
                    dbcamp.percentComplete = 0.0
                # print('percent complete', dbcamp.percentComplete)
                dbcamp.percentCompleteForGivenDays = Decimal(row[percentCompleteForGivenDays])
                if dbcamp.percentCompleteForGivenDays == 'Infinity':
                    print('percent complete for given days = infinity error')
                    dbcamp.percentCompleteForGivenDays = 0.0
                # print('for given days', dbcamp.percentCompleteForGivenDays)
                dbcamp.moneyPerDonor = Decimal(row[moneyPerDonor])
                if dbcamp.moneyPerDonor == 'Infinity':
                    print('money Per Donor= infinity error')
                    dbcamp.moneyPerDonor = 0.0
                # print('money per donor', dbcamp.moneyPerDonor)

                # try:
                #     print(dbcamp.title)
                # except:
                #     print("title for ", dbcamp.description, " contains unknown chars")
                # try:
                #     print(dbcamp.description)
                # except:
                #     print("description for ", dbcamp.title, " contains unknown chars")
                try:
                    dbcamp.save()
                except:
                    print("error saving", dbcamp.title, "to the database")
                    numFails += 1

                # print(dbcamp)
            #end of if statement
        print("finished saving campaigns to the database")
        print("how many records failed to save?", numFails)
        #end of for loop
    #end of with open file stuff
#end of create campaigns def

def main():
    createCampaigns()

#bootstrap
if __name__ == "__main__":
    main()