public with sharing class UserController {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserList() {
        return [
            Select Name, UserRole.Name from User
            WHERE UserRole.Name = 'Employee'
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}