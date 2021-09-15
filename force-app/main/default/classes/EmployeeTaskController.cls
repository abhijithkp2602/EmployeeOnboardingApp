public class EmployeeTaskController {
    @AuraEnabled
    public static User_Assigned_Task__c[] getTask(Id EmployeeId) {
        return [
            SELECT Assigned_To__c,Assigning_Date__c,Name,Overdue__c,Status__c,Step_name__c,Submission_date__c,
            Target_Date__c,Task_Completed__c,Task_Incomplete__c 
            FROM User_Assigned_Task__c 
            WHERE Assigned_To__c =: EmployeeId      
        ];
    }
}