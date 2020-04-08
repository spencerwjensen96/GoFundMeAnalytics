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
    with open('Cleaned_Campaign.csv', encoding='utf-8') as campCSV:
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
            if(row[1] != 'Unnamed: 0'): # this skips the first row, we don't want to save the headers to our database
                dbcamp = Campaign()
                dbcamp.currentAmount = Decimal(row[currentAmount])
                dbcamp.daysActive = Decimal(row[daysActive])
                dbcamp.goal = row[goal]
                dbcamp.donators = row[donators]
                dbcamp.title = row[title]
                dbcamp.description = row[description]
                dbcamp.userFirst = row[userFirst]
                dbcamp.userLast = row[userLast]
                dbcamp.status = row[status] # if = 1 then true, if = 0 then false // I hope :)
                dbcamp.imageUrl = row[imageUrl]
                dbcamp.launchDate = row[launchDate]
                dbcamp.campaignHearts = row[campaignHearts]
                dbcamp.socialShareTotal = row[socialShareTotal]
                dbcamp.percentComplete = row[percentComplete]
                if dbcamp.percentComplete == 'Infinity':
                    print('percent complete = infinity error')
                    dbcamp.percentComplete = 0.0
                dbcamp.percentCompleteForGivenDays = row[percentCompleteForGivenDays]
                if dbcamp.percentCompleteForGivenDays == 'Infinity':
                    print('percent complete for given days = infinity error')
                    dbcamp.percentCompleteForGivenDays = 0.0
                dbcamp.moneyPerDonor = row[moneyPerDonor]
                if dbcamp.moneyPerDonor == 'Infinity':
                    print('money Per Donor = infinity error')
                    dbcamp.moneyPerDonor = 0.0

                try:
                    dbcamp.save()
                except ValueError as err:
                    print("VALUE error saving", dbcamp.title, "--- to database")
                    numFails += 1
                except TypeError as err:
                    print("TYPE error saving", dbcamp.title, "--- to database")
                    numFails += 1
                except IOError as err:
                    print("I/O error saving", dbcamp.title, "--- to database")
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