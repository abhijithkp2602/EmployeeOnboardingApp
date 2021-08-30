import { LightningElement, wire } from 'lwc';
import Name_FIELD from '@salesforce/schema/User.Name';
import ROLE_FIELD from '@salesforce/schema/User.UserRoleId';
import getUser from '@salesforce/apex/EmployeeDetailsController.getUser';
const COLUMNS = [
    { label: 'Name', fieldName: Name_FIELD.fieldApiName, type: 'text' },
    { label: 'Role', fieldName: ROLE_FIELD.fieldApiName, type: 'text' },
];

export default class EmployeeList extends LightningElement {
    columns = COLUMNS;
    @wire(getUser)
    users;
}