public class GuideEmployeeController {
    @AuraEnabled
    public static User[] getEmployee(Id GuideId) {
        system.debug('Welcome to apex');
        return [
            SELECT Id, Name FROM User WHERE Id IN 
            (SELECT Employee_Name__c FROM User_functional_role_junction__c 
            WHERE Mentor_Name__c =: GuideId AND Onboarding_completed__c =false)
            AND Profile.Name = 'Employee Customer Community'
            // SELECT Employee_Name__r.Name, 
            // (SELECT Id, Name, Profile.Name, FullPhotoUrl
            // FROM User 
            // WHERE Profile.Name = 'Employee Customer Community')
            // FROM User_functional_role_junction__c
            // WHERE Mentor_Name__c =: Guideid
        ];
    }
}