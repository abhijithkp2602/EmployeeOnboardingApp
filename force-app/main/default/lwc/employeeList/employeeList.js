import { LightningElement, wire } from 'lwc';
import Name_FIELD from '@salesforce/schema/User.Name';
// import ROLE_FIELD from '@salesforce/schema/User.UserRole.Name';
import getUserList from '@salesforce/apex/UserController.getUserList';

const COLUMNS = [
    { label: 'Name', fieldName: Name_FIELD.fieldApiName, type: 'text' },
    // { label: 'Role', fieldName: ROLE_FIELD.fieldApiName, type: 'text' },
];

export default class EmployeeList extends LightningElement {
    columns = COLUMNS;
    @wire(getUserList)
    users;
    
}