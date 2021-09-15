@isTest
public class LookupTest {
    @isTest  
    static sObject[] test(){
        List<sObject> search = Lookup.search('Sanjay','User','User.Name');
        return search;
    }

}