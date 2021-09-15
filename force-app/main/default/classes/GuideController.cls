public with sharing class GuideController {
    @AuraEnabled(Cacheable=true)
    public static User[] getGuideList() {
        return[
            SELECT Id, Name, Profile.Name, FullPhotoUrl 
            FROM User 
            WHERE Profile.Name = 'Mentor'
            WITH SECURITY_ENFORCED
        ];
    }

    // @AuraEnabled(cacheable=true)
    // public static List<User> findGuides(String searchKey) {
    //     String key = '%' + searchKey + '%';
    //     return [
    //         SELECT Id, Name, Profile.Name, FullPhotoUrl 
    //         FROM User 
    //         WHERE Profile.Name = 'Mentor' AND Name LIKE :key
    //         WITH SECURITY_ENFORCED
    //     ];
    // }

    // @AuraEnabled(cacheable=true)
    // public static User getSingleGuide() {
    //     return [
    //         SELECT Id, Name, Profile.Name, FullPhotoUrl 
    //         FROM User
    //         WHERE Profile.Name = 'Mentor'
    //         WITH SECURITY_ENFORCED
    //         LIMIT 1
    //     ];
    // }



    // @AuraEnabled(Cacheable=true)
    // public static User[] searchGuides(String searchTerm) {
    //     // Return all guides when no search term
    //     searchTerm = searchTerm.trim();
    //     if (searchTerm == '') {
    //         return getGuideList();
    //     }
    //     // Prepare query paramters
    //     searchTerm = '%' + searchTerm + '%';
    //     // Execute search query
    //     return[
    //         SELECT Id, Name, Profile.Name 
    //         FROM User 
    //         WHERE Profile.Name = 'Mentor' AND Name LIKE :searchTerm
    //     ];
    // }
}