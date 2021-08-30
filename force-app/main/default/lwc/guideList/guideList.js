import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/GuideController.getContactList';

export default class GuideList extends LightningElement {
    contacts;
    error;

    @wire(getContactList)
    wiredContacts({ data }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } 
    }
}