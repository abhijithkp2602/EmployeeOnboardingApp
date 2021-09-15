public with sharing class OnboardingExtensionCntr {
        @AuraEnabled(Cacheable=true)
        public static User[] getEmployeesList() {
            return [
                SELECT Completed_Onboarding__c,Id,Name,Onboarding_End_Date__c,FullPhotoUrl,
                Onboarding_Start_Date__c,Reason_for_extend__c,Functional_Role__c FROM User where Completed_Onboarding__c=false AND Profile.Name='Employee Customer Community' AND IsActive = true
            ];
        }
        @AuraEnabled(Cacheable=false)
        public static void updateRec(string searchkey){
             system.debug('Entering into apex class');
            
             User ufr=[
                SELECT Completed_Onboarding__c,Id FROM User
                WHERE Id=:searchkey LIMIT 1
            ];
            ufr.Completed_Onboarding__c=true;
            update ufr;
            
        }
    }