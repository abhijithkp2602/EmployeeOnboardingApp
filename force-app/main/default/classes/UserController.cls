public with sharing class UserController {
    @AuraEnabled(Cacheable=true)
    public static User[] getEmployeesList(Id GuideId) {
        return [
            SELECT Id, Name FROM User WHERE Id IN 
            (SELECT Employee_Name__c FROM User_functional_role_junction__c 
            WHERE Mentor_Name__c =: GuideId)
            AND Profile.Name = 'Employee Customer Community'
        //     SELECT Employee_Name__r.Name, Role__r.Name 
        //     FROM User_functional_role_junction__c
        //     ORDER BY Employee_Name__r.Name
        // ];
        // return[
        //     SELECT Id, Name, Profile.Name, FullPhotoUrl 
        //     FROM User 
        //     WHERE Profile.Name = 'Employee Customer Community'
        //     WITH SECURITY_ENFORCED
        ];
    }

    // @AuraEnabled(Cacheable=true)
    // public static  User[] searchEmployees(String searchTerm) {
    //     // Return all employee when no search term
    //     searchTerm = searchTerm.trim();
    //     if (searchTerm == '') {
    //         return getEmployeesList();
    //     }
    //     // Prepare query paramters
    //     searchTerm = '%' + searchTerm + '%';
    //     // Execute search query
    //     return [
    //         SELECT Id, Name FROM User WHERE Id IN 
    //         (SELECT Employee_Name__c FROM User_functional_role_junction__c 
    //         WHERE Mentor_Name__c =: GuideId AND Onboarding_completed__c =false)
    //         AND Profile.Name = 'Employee Customer Community' AND Name LIKE :searchTerm
    //         // SELECT Employee_Name__r.Name, Role__r.Name 
    //         // FROM User_functional_role_junction__c
    //         // WHERE Employee_Name__r.Name LIKE :searchTerm
    //         // ORDER BY Employee_Name__r.Name
    //     ];
    // }
}