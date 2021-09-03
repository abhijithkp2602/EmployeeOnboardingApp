public class GuideEmployeeController {
    @AuraEnabled
    public static User_functional_role_junction__c[] getEmployee(Id GuideId) {
        return [
            SELECT Employee_Name__r.Name
            FROM User_functional_role_junction__c 
            WHERE Mentor_Name__c =: Guideid          
        ];
    }
}
