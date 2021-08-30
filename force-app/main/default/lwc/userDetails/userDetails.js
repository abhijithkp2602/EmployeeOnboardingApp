import { LightningElement, wire } from 'lwc';
import Name_FIELD from '@salesforce/schema/User.Name';
import getUser from '@salesforce/apex/EmployeeDetailsController.getUser';
const COLUMNS = [
    { label: 'Name', fieldName: Name_FIELD.fieldApiName, type: 'text' },
];

export default class userDetails extends LightningElement {
    columns = COLUMNS;
    @wire(getUser)
    users;
     
}