@isTest
public class AssignedTaskProviderTest {
    @isTest
    public static void passwordresettest(){
        try{
        //Create portal account owner
        UserRole portalRole = [Select Id From UserRole Where PortalType = 'None' Limit 1];
        Profile profile1 = [Select Id from Profile where name = 'System Administrator'];
        User portalAccountOwner1 = new User(
            UserRoleId = portalRole.Id,
            ProfileId = profile1.Id,
            Username = System.now().millisecond() + 'test211@test.com',
            Alias = 'batman',
            Email='bruce.wayne@wayneenterprises.com',
            EmailEncodingKey='UTF-8',
            Firstname='Bruce',
            Lastname='Wayne',
            LanguageLocaleKey='en_US',
            LocaleSidKey='en_US',
            TimeZoneSidKey='America/Chicago'
        );
        Database.insert(portalAccountOwner1);
        System.RunAs(portalAccountOwner1){
        test.startTest();
        //Create account
        Account portalAccount1 = new Account(
            Name = 'TestAccount',
            OwnerId = portalAccountOwner1.Id
        );
        Database.insert(portalAccount1);
        
        //Create contact
        Contact contact1 = new Contact(
            FirstName = 'Test',
            Lastname = 'McTesty',
            AccountId = portalAccount1.Id,
            Email = System.now().millisecond() + 'test@test.com'
        );
        Database.insert(contact1);
        
        //Create user
        Profile portalProfile = [SELECT Id FROM Profile WHERE Name='Partner Community User'Limit 1];
        User user1 = new User(
            Username = System.now().millisecond() + 'test12345@test.com',
            ContactId = contact1.Id,
            ProfileId = portalProfile.Id,
            Alias = 'test123',
            Email = 'test12345@test.com',
            EmailEncodingKey = 'UTF-8',
            LastName = 'McTesty',
            CommunityNickname = 'test12345',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US'
        );
        Database.insert(user1);
            test.stopTest();
            AssignedTaskProvider.enrollUser(user1.Id, user1.Mentor__c, '2021-10-05', '2021-10-21');
        List<User_Assigned_Task__c> getMyTaskList = AssignedTaskProvider.getMyTaskList();
        }
    } 
    catch(exception e){
           System.debug('e.getMessage'+e.getMessage());
       }
    }
}