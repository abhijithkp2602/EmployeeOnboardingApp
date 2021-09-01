public with sharing class GuideController {
    @AuraEnabled(Cacheable=true)
    public static AggregateResult[] getGuideList() {
        return [
            SELECT Mentor_Name__r.Name 
            FROM User_Assigned_Task__c 
            GROUP BY Mentor_Name__r.Name
            ORDER BY Mentor_Name__r.Name
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static AggregateResult[] searchGuides(String searchTerm) {
        // Return all guides when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getGuideList();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT Mentor_Name__r.Name 
            FROM User_Assigned_Task__c
            WHERE Mentor_Name__r.Name LIKE :searchTerm 
            GROUP BY Mentor_Name__r.Name
            ORDER BY Mentor_Name__r.Name
        ];
    }
}









// public with sharing class GuideController {
//     @AuraEnabled(cacheable=true)
//     public static List<User> getGuideList() {
//         return [
//             SELECT Name
//             FROM User
//             WHERE UserRole.Name = 'Guides'
//             WITH SECURITY_ENFORCED
            
//         ];
//     }
// }