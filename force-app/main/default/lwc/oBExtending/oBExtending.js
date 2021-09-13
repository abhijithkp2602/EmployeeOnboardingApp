import { publish, MessageContext } from 'lightning/messageService';
import EMPLOYEE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/EmployeeListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, api,track} from 'lwc';
/** BearController.searchguides(searchTerm) Apex method */
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getEmployeesList from '@salesforce/apex/OnboardingExtensionCntr.getEmployeesList';
import IsActive from '@salesforce/schema/Pricebook2.IsActive';
import findrec from '@salesforce/apex/OnboardingExtensionCntr.updateRec';
export default class oBExtending extends NavigationMixin(LightningElement) {
	@api recordId;
  @track showEditForm=false;
  @track searchkey='';
	@track employeeId = '';
    //  @wire(findrec,{searchkey:'$searchkey'})
    handleClick(event){
        console.log(event.Id);
        console.log(event.recordId);
				this.employeeId = event.target.value;
				console.log('employeeId-->'+this.employeeId);
        this.showEditForm=true;
         console.log(this.recordId);
        // this.template.querySelector("c-parentLwc");
        console.log('testdata'+ event.target.dataset.recordId);
    }
    closeModal(event){
        this.showEditForm=false;
    }
    handleSubmit(event){
        console.log('submit');
        this.template.querySelector('lightning-record-edit-form').submit();
        // // event.preventDefault();       // stop the form from submitting
        // const fields = event.detail.fields;
        // console.log('Date', fields);
        // this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
     handleSuccess(event){
         console.log('Updated');
         this.closeModal();
         const evt = new ShowToastEvent({
            title: "Success",
            message: "Successfully updated",
            variant: "success",
        });
        this.dispatchEvent(evt);
         
     }
     handleSuccess1(event){
        console.log('Deleted');
        this.closeModal();
        const evt1 = new ShowToastEvent({
           title: "Success",
           message: "Successfully Onboarding completed",
           variant: "success",
       });
       this.dispatchEvent(evt1);
        
    }
     updateRecord(event){
        this.searchkey = event.target.value;
		console.log('employeeId-->'+this.searchkey);
        findrec({
            searchkey:this.searchkey
        })
        .then(()=>{
                console.log('success');
                const evt1 = new ShowToastEvent({
                    title: "Success",
                    message: "Successfully Onboarding completed",
                    variant: "success",
                });
                this.dispatchEvent(evt1);
        })
     }
     


	@wire(getEmployeesList) employees;

    @wire(MessageContext) messageContext;

	handleEmployeeView(event) {

		const employeeId = event.detail;
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: employeeId,
				objectApiName: 'User_functional_role_junction__c',
				actionName: 'edit',
			},
		});
	}

    navigateToview() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.employees.Id,
                objectApiName: 'User_functional_role_junction__c',
                actionName: 'view'
            }
        });
    }

    navigateToEdit(event) {
		const employeeId = event.detail;
		// Navigate to Guide record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: employeeId,
                objectApiName: 'User_functional_role_junction__c',
                actionName: 'edit'
            }
        });
	//      var editrecordevent= $a.get("e.force:editrecord");
	// 	 editrecordevent.setparams({
	// 		 "recordId": this.employees.data.Id

		
	// 	 });
	// 	 editrecordevent.fire();

    //  }

}
}