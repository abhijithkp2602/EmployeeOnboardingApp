public without sharing class AssignedTaskProvider {
    // @AuraEnabled
    // public static List<User_Assigned_Task__c> getTaskList(String userid){
    //     return [SELECT Assigned_To__c,Assigning_Date__c,Id,Mentor_Name__c,Name,Overdue__c,Status__c,Step_name__r.Name,Submission_date__c 
    //     FROM User_Assigned_Task__c Where Assigned_To__c=:userid];
    // }
    @AuraEnabled
    public static List<User_Assigned_Task__c> getMyTaskList(){
        String loggedinuser = UserInfo.getUserId();
        return [SELECT Assigned_To__c,Assigning_Date__c,Id,Mentor_Name__c,Name,Overdue__c,Status__c,Step_name__r.Name,Submission_date__c 
        FROM User_Assigned_Task__c Where Assigned_To__c=:loggedinuser];
    }
    
    // @AuraEnabled
    // public static User getUser(String userid){
    //     return [SELECT Id,Name,Onboarding_End_Date__c,Completed_Onboarding__c FROM User where Id=:userid limit 1];
    // }
    // @AuraEnabled
    // public static String getProfileName(){
    //     id profileId = userinfo.getProfileId();
	// 	Profile prof = [select Name from profile where id = :profileId];
    //     return prof.Name;
    // }
     @AuraEnabled
    public static void enrollUser(String explorerid,String mentorid,String startdate,String enddate){
        String loggedinuser = UserInfo.getUserId();
        User selectedUser = new user();
        selectedUser.Id = explorerid;
        selectedUser.Mentor__c=mentorid;
        selectedUser.ManagerId=loggedinuser;
        selectedUser.Onboarding_Start_Date__c=Date.valueof(startdate);
        selectedUser.Onboarding_End_Date__c = Date.valueof(enddate);
        // selectedUser.Welcome_Email__c = boolean.valueof(welcomeemail);
        update selectedUser;
    }
}