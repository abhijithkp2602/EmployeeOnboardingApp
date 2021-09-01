import { LightningElement } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ASSIGNEDTASK_OBJECT from "@salesforce/schema/User_Assigned_Task__c";
import STEPNAME_FIELD from "@salesforce/schema/User_Assigned_Task__c.Step_name__c";
import ASSIGNINGDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Assigning_Date__c";
import TARGETDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Target_Date__c";
import MENTORNAME_FIELD from "@salesforce/schema/User_Assigned_Task__c.Mentor_Name__c";
import ASSIGNEDTO_FIELD from "@salesforce/schema/User_Assigned_Task__c.Assigned_To__c";
import ONBOARDINGSTEP_OBJECT from "@salesforce/schema/Onboarding_Step__c";
import ONBOARDINGSTEPNAME_FIELD from "@salesforce/schema/Onboarding_Step__c.Name";
import RECORDTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.RecordTypeId";
import DURATIONTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration_Type__c";
import DURATION_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration__c";


export default class EmployeeEnrollment extends LightningElement {
    objectApiName = ASSIGNEDTASK_OBJECT;
    fields = [STEPNAME_FIELD, MENTORNAME_FIELD, ASSIGNEDTO_FIELD, ASSIGNINGDATE_FIELD, TARGETDATE_FIELD];
    objectApiName1 = ONBOARDINGSTEP_OBJECT;
    fields1 = [ONBOARDINGSTEPNAME_FIELD, RECORDTYPE_FIELD, DURATIONTYPE_FIELD, DURATION_FIELD];
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}