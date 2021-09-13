import { LightningElement, track, wire } from 'lwc';
import getGuideList from '@salesforce/apex/GuideController.getGuideList';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';

export default class EmployeeWithData extends LightningElement {
    selectedContact;

    @track records;
    @track guideId;

    // @wire(getGuideList)
    // guides;
    
    @wire(getEmployee, {GuideId: '$guideId'})
    employees({error,data}){
        if(data){
            this.records = data;
        }
    }

    // contactSelected(event) {
    //     this.guideId = event.detail;
    //     this.selectedContact = this.employees.data;
    // }

    // get listIsNotEmpty() {
    //     return this.guides && Array.isArray(this.guides.data) && this.guides.data.length > 0;
    // }
}