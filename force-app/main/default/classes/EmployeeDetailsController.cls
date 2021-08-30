public with sharing class EmployeeDetailsController {
        @AuraEnabled(cacheable=true)
        public static List<User> getUser() {
            return [
                SELECT Name, UserRole.Name
                FROM User
                WHERE userRole.Name = 'Employee'
                WITH SECURITY_ENFORCED
                ORDER BY Name
            ];
        }
    }