@isTest 
public class GuideController_Test {
    static void testset() {
        
        User userToCreate = new User();
        
        // Do you recognize these fields?
        userToCreate.FirstName = 'David';
        userToCreate.LastName  = 'Liu';
        userToCreate.Email     = 'dvdkliu+sfdc99@gmail.com';
        userToCreate.Username  = 'sfdc-dreamer@gmail.com';
        userToCreate.Alias     = 'fatty';
        userToCreate.ProfileId = '00ei0000000rTfp';
        
        // Don't worry about these
        userToCreate.TimeZoneSidKey    = 'America/Denver';
        userToCreate.LocaleSidKey      = 'en_US';
        userToCreate.EmailEncodingKey  = 'UTF-8';
        userToCreate.LanguageLocaleKey = 'en_US';
        
        insert userToCreate;
        
        Test.startTest();  
        User testset = [SELECT FirstName,LastName,Email,Username,Alias,ProfileId,TimeZoneSidKey,LocaleSidKey,EmailEncodingKey,LanguageLocaleKey FROM User LIMIT 1];  
        Test.stopTest();  
        System.assertEquals(testset, userToCreate);
    }
    @isTest  
    static User[] test(){
        List<User> getGuideList = GuideController.getGuideList();
        return getGuideList;
    }
    
    
}