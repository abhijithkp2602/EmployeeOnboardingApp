import { LightningElement, track, wire, api} from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import strUserId from '@salesforce/user/Id';
import getGuideList from '@salesforce/apex/GuideController.getGuideList';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';
import getTask from '@salesforce/apex/EmployeeTaskController.getTask';
import enrollUser from '@salesforce/apex/AssignedTaskProvider.enrollUser';

// import USERASSIGNEDTASK_OBJECT from "@salesforce/schema/User_Assigned_Task__c";
// import STEPNAME_FIELD from "@salesforce/schema/User_Assigned_Task__c.Step_name__c";
// import ASSIGNEDDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Assigning_Date__c";
// import TARGETDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Target_Date__c";
// import SUBMISSIONDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Submission_date__c";
// import STATUS_FIELD from "@salesforce/schema/User_Assigned_Task__c.Status__c";

import ONBOARDINGSTEP_OBJECT from "@salesforce/schema/Onboarding_Step__c";
import ONBOARDINGSTEPNAME_FIELD from "@salesforce/schema/Onboarding_Step__c.Name";
import DURATIONTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration_Type__c";
import DURATION_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration__c";
import DISCRIPTION_FIELD from "@salesforce/schema/Onboarding_Step__c.Description__c";

export default class EmployeeEnrollment extends LightningElement {

    managerId = strUserId;

    @wire(getGuideList) guides;
    @track employees;
    @track tasks;
    @api guide;
    @api employee;
    @api task;
    @track mentorid;

    @track userid;
    @track isModalOpen = false;
    @track closeModalOpen = false;

    @track explorerid;
    @track mentorid;
    @track roleid;
    // @track taskrecid;

    handleExplorerSelection(event){
        console.log("the selected explorer id is"+event.detail);
        this.explorerid = event.detail;
    }
    handleMentorSelection(event){
        console.log("the selected mentor id is"+event.detail);
        this.mentorid = event.detail;
    }

    enrollUser(){
        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);
        if (isInputsCorrect) {
        const functionalRole = this.template.querySelector('.functionalRole').value;
        const startdate = this.template.querySelector('.startdate').value;
        const enddate = this.template.querySelector('.enddate').value;
        console.log(functionalRole+'---'+startdate+'---'+enddate+'---');

         enrollUser({explorerid: this.explorerid,mentorid:this.mentorid,functionalRole:functionalRole,startdate:startdate,enddate:enddate})
        .then(result => {
            console.log('user updated==>', result);
            const toast = new ShowToastEvent({
                'title' : 'Updated',
                "message" : 'Record Updated Successfully',
                "variant" : "success",
            });
            this.dispatchEvent(toast); 
            window.location.reload();
        })
        .catch(error =>{
            console.log('Error==>',error);
        })
        }
    }
    // objectApiName = USERASSIGNEDTASK_OBJECT;
    // fields = [STEPNAME_FIELD, ASSIGNEDDATE_FIELD, TARGETDATE_FIELD, SUBMISSIONDATE_FIELD, STATUS_FIELD];

    objectApiName1 = ONBOARDINGSTEP_OBJECT;
    fields1 = [ONBOARDINGSTEPNAME_FIELD, DISCRIPTION_FIELD, DURATIONTYPE_FIELD, DURATION_FIELD];

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        window.location.reload();
    }

    handleSelect(event) {
        event.preventDefault();
        this.guideidKey = event.currentTarget.dataset.guideid;
        console.log(this.guideidKey);
        getEmployee({
            GuideId : this.guideidKey
        }).then(result => {
            this.employees = result;
            console.log('this.employees' + JSON.stringify(this.employees));
        });
        this.mentorid = this.guideidKey;
        console.log('mentorid >>>' + JSON.stringify(this.mentorid));
    }
    showguide(event){
        event.preventDefault();
        this.employees = undefined;
    }

    taskProgress(event){
        event.preventDefault();
        this.employees = undefined;
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

    // showTaskDetail(event){
    //     this.taskrecid = event.target.value;
    //     this.isModalOpen = true;
    // }

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