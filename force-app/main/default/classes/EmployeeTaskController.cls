public class EmployeeTaskController {
    @AuraEnabled
    public static User_Assigned_Task__c[] getTask(Id TaskId) {
        return [
            SELECT Assigned_To__r.Name, Status__c, Step_name__r.Name, Target_Date__c
            FROM User_Assigned_Task__c 
            WHERE Assigned_To__c =: Taskid          
        ];
    }
}

