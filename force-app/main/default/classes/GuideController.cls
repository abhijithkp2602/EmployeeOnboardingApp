public with sharing class GuideController {
    @AuraEnabled(Cacheable=true)
    public static User[] getGuideList() {
        return[
            SELECT Id, Name, Profile.Name 
            FROM User 
            WHERE Profile.Name = 'Mentor'
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static User[] searchGuides(String searchTerm) {
        // Return all guides when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getGuideList();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return[
            SELECT Id, Name, Profile.Name 
            FROM User 
            WHERE Profile.Name = 'Mentor' AND Name LIKE :searchTerm
        ];
    }
}