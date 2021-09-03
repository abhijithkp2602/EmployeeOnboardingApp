import { LightningElement, track, wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// import ASSIGNEDTASK_OBJECT from "@salesforce/schema/User_Assigned_Task__c";
// import STEPNAME_FIELD from "@salesforce/schema/User_Assigned_Task__c.Step_name__c";
// import ASSIGNINGDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Assigning_Date__c";
// import TARGETDATE_FIELD from "@salesforce/schema/User_Assigned_Task__c.Target_Date__c";
// import MENTORNAME_FIELD from "@salesforce/schema/User_Assigned_Task__c.Mentor_Name__c";
// import ASSIGNEDTO_FIELD from "@salesforce/schema/User_Assigned_Task__c.Assigned_To__c";

// import USER_OBJECT from "@salesforce/schema/User";
// import NAME_FIELDS from "@salesforce/schema/User.Name";
// import FUNCTIONALROLE_FIELDS from "@salesforce/schema/User.Functional_Role__c";
// import STARTDATE_FIELDS from "@salesforce/schema/User.Onboarding_Start_Date__c";
// import ENDDATE_FIELDS from "@salesforce/schema/User.Onboarding_End_Start__c";

import USERENROLLMENT_OBJECT from "@salesforce/schema/User_functional_role_junction__c";
import EMPLOYEENAME_FIELD from "@salesforce/schema/User_functional_role_junction__c.Employee_Name__c";
import ROLE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Role__c";
import MENTORNAME_FIELD from "@salesforce/schema/User_functional_role_junction__c.Mentor_Name__c";
import STARTDATE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Onboarding_Start_Date__c";
import ENDDATE_FIELD from "@salesforce/schema/User_functional_role_junction__c.Onboarding_End_Date__c";
import CONTACT_FIELD from "@salesforce/schema/User_functional_role_junction__c.Contact__c";
import ONBOARDINGSTEP_OBJECT from "@salesforce/schema/Onboarding_Step__c";
import ONBOARDINGSTEPNAME_FIELD from "@salesforce/schema/Onboarding_Step__c.Name";
// import RECORDTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.RecordTypeId";
import DURATIONTYPE_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration_Type__c";
import DURATION_FIELD from "@salesforce/schema/Onboarding_Step__c.Duration__c";
import DISCRIPTION_FIELD from "@salesforce/schema/Onboarding_Step__c.Description__c";


export default class EmployeeEnrollment extends LightningElement {
    @track
    RecordTypeId;

    @wire(getObjectInfo, { objectApiName1: ONBOARDINGSTEP_OBJECT })
    handleObjectInfo({error, data}) {
        if (data) {
            const rtis = data.recordTypeInfos;
            this.recordTypeId = Object.keys(rtis).find(rti => rtis[rti].name === 'record type 1');
        }
    }
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
}