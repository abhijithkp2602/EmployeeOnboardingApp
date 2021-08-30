public with sharing class GuideController {
    @AuraEnabled(cacheable=true)
    public static List<User> getContactList() {
        return [
            SELECT Name
            FROM User
            WHERE UserRole.Name = 'Guides'
            WITH SECURITY_ENFORCED
            
        ];
    }
}