import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import STEPNAME_FIELD from '@salesforce/schema/User_Assigned_Task__c.Step_name__c';
const User_Assigned_TaskFields = [STEPNAME_FIELD];

export default class OnboardingTask extends LightningElement {
    @api recordId; // Bear Id
	@wire(getRecord, { recordId: '$recordId', fields: User_Assigned_TaskFields })
    User_Assigned_Task;
	get Step_name__c() {
		return getFieldValue(this.User_Assigned_Task.data, STEPNAME_FIELD);
	}
}