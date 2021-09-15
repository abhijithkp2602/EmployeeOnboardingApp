@isTest
public class EmployeeTaskControllerTest {
    @isTest
    static void testset(){
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
                Account portalAccount1 = new Account(
                    Name = 'TestAccount',
                    OwnerId = portalAccountOwner1.Id
                );
                Database.insert(portalAccount1);
                Contact contact1 = new Contact(
                    FirstName = 'Test',
                    Lastname = 'McTesty',
                    AccountId = portalAccount1.Id,
                    Email = System.now().millisecond() + 'test@test.com'
                );
                Database.insert(contact1);
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
                List<User_Assigned_Task__c> getTask = EmployeeTaskController.getTask(user1.Id);    
            }
        } 
        catch(exception e){
            System.debug('e.getMessage'+e.getMessage());
        }
    } 
}