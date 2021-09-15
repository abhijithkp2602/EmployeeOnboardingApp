import { LightningElement, track, wire, api} from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import Id from '@salesforce/user/Id';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';
import getTask from '@salesforce/apex/EmployeeTaskController.getTask';

import ONBOARDINGSTEP_OBJECT from "@salesforce/schema/Onboarding_Step__c";
import ONBOARDINGSTEPNAME_FIELD from "@salesforce/schema/Onboarding_Step__c.Name";
import DURATIONTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration_Type__c";
import DURATION_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration__c";
import DISCRIPTION_FIELD from "@salesforce/schema/Onboarding_Step__c.Description__c";

export default class MentorHome extends LightningElement {

    @wire(getEmployee, { GuideId: Id }) 
    employees;

    mentorId = Id;

    @track tasks;
    @api guide;
    @api employee;
    @api task;
    // @track mentorid;

    @track userid;
    @track isModalOpen = false;
    @track closeModalOpen = false;


    objectApiName1 = ONBOARDINGSTEP_OBJECT;
    fields1 = [ONBOARDINGSTEPNAME_FIELD, DISCRIPTION_FIELD, DURATIONTYPE_FIELD, DURATION_FIELD];

    taskProgress(event){
        event.preventDefault();
        this.employeeidKey = event.currentTarget.dataset.employeeid;
        console.log(this.employeeidKey);
        getTask({
            EmployeeId : this.employeeidKey
        }).then(result => {
            this.tasks = result;
            console.log('this.tasks' + JSON.stringify(this.tasks));
        });
        this.userid = this.employeeidKey;
        console.log('userid' + JSON.stringify(this.userid));
    }

    showEmployee(event){
        event.preventDefault();
        this.tasks = undefined;
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
}