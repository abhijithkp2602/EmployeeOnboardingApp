// //public with sharing class UserController {
//     @AuraEnabled(cacheable=true)
//     public static List<User> getUserList() {
//         return [
//             Select Name, UserRole.Name from User
//             WHERE UserRole.Name = 'Employee'
//             WITH SECURITY_ENFORCED
//             ORDER BY Name
//         ];
//     }
// }

public with sharing class UserController {
    @AuraEnabled(Cacheable=true)
    public static User_functional_role_junction__c[] getEmployeesList() {
        return [
            SELECT Employee_Name__r.Name, Role__r.Name 
            FROM User_functional_role_junction__c
            ORDER BY Employee_Name__r.Name
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static  User_functional_role_junction__c[] searchEmployees(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getEmployeesList();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT Employee_Name__r.Name, Role__r.Name 
            FROM User_functional_role_junction__c
            WHERE Employee_Name__r.Name LIKE :searchTerm
            ORDER BY Employee_Name__r.Name
        ];
    }
}