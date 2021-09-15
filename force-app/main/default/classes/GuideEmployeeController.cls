public class GuideEmployeeController {
    @AuraEnabled(Cacheable=true)
    public static User[] getEmployee(Id GuideId) {
        system.debug('Welcome to apex');
        return [
            SELECT Id, Name, Functional_Role__c, FullPhotoUrl FROM User
            WHERE Mentor__c =: GuideId AND Completed_Onboarding__c =false
            AND Profile.Name = 'Employee Customer Community'
        ];
    }
    // @AuraEnabled(cacheable=true)
    // public static User getSingleUser() {
    //     return [
    //         SELECT Id, FirstName, LastName, Mentor__c
    //         FROM User
    //         WITH SECURITY_ENFORCED
    //         LIMIT 1
    //     ];
    // }
}