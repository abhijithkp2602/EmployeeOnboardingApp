import { LightningElement, track, wire, api} from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getGuideList from '@salesforce/apex/GuideController.getGuideList';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';

import USERENROLLMENT_OBJECT from "@salesforce/schema/User_functional_role_junction__c";
import EMPLOYEENAME_FIELD from "@salesforce/schema/User_functional_role_junction__c.Employee_Name__c";
import ROLE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Role__c";
import MENTORNAME_FIELD from "@salesforce/schema/User_functional_role_junction__c.Mentor_Name__c";
import STARTDATE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Onboarding_Start_Date__c";
import ENDDATE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Onboarding_End_Date__c";
import CONTACT_FIELD from "@salesforce/schema/User_functional_role_junction__c.Contact__c";
import ONBOARDINGSTEP_OBJECT from "@salesforce/schema/Onboarding_Step__c";
import ONBOARDINGSTEPNAME_FIELD from "@salesforce/schema/Onboarding_Step__c.Name";

import DURATIONTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration_Type__c";
import DURATION_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration__c";
import DISCRIPTION_FIELD from "@salesforce/schema/Onboarding_Step__c.Description__c";


export default class EmployeeEnrollment extends LightningElement {
    @wire(getGuideList) guides;

    @track employees;

    // @track guideidKey = '';
    // sampledata = '';
    // @wire(getEmployee, {GuideId: '$guideidKey'})
    // employees({data,error}){
    //     if(data){
    //         console.log(data);
    //         this.sampledata = data;
    //         console.log(this.sampledata);
    //     }
    //     else if(error){
    //         console.log(error);
    //     }
    // }
    
    
    // @track sample = [];
    // @api employees;
    @api guide;

    objectApiName = USERENROLLMENT_OBJECT;
    fields = [EMPLOYEENAME_FIELD, ROLE_FIELD, CONTACT_FIELD, MENTORNAME_FIELD, STARTDATE_FIELD, ENDDATE_FIELD];
    objectApiName1 = ONBOARDINGSTEP_OBJECT;
    fields1 = [ONBOARDINGSTEPNAME_FIELD, DISCRIPTION_FIELD, DURATIONTYPE_FIELD, DURATION_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    // handleGuideView(event) {
    // 	console.log(event);    onguideview={handleGuideView}
    // 	this.employees = event.detail;
	// }

    handleSelect(event) {
        // this.employees= true;
        this.guideidKey = event.currentTarget.dataset.guideid;
        console.log(this.guideidKey);
        getEmployee({
            GuideId : this.guideidKey
        }).then(result => {
            console.log('Got employees' + JSON.stringify(result));
            this.employees = result;
            console.log('this.employees' + JSON.stringify(this.employees));
        //     const selectedEvent = new CustomEvent('guideview',{
        //         detail : employees
        //         // console.log('employees' + employees);
        //     });
        // // Dispatches the event.
        //     console.log(employees);
        //     console.log(selectedEvent);
        //     this.dispatchEvent(selectedEvent);
            
            // if(employees.size>0){
            //     this.data = employees;

            // } 
        });
    }
}





// alert(event.currentTarget.dataset.guideid)
        // getEmployee({
        //     GuideId : event.currentTarget.dataset.guideid
        // }).then(result => {
        //     this.employees = result;
        // })



        // this.employeeList = employeeList;
            // this.sample = employeeList;
            // console.log('data',this.sample.originalTarget);




            // this.guideidKey = event.currentTarget.dataset.guideid;
        // alert('test'+event.currentTarget.dataset.guideid)
        // console.log(this.employees.data);