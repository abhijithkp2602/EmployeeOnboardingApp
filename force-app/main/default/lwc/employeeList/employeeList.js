import { publish, MessageContext } from 'lightning/messageService';
import EMPLOYEE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/EmployeeListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire} from 'lwc';
/** BearController.searchguides(searchTerm) Apex method */
import searchEmployees from '@salesforce/apex/UserController.searchEmployees';
export default class EmployeeList extends NavigationMixin(LightningElement) {
	searchTerm = '';
	employees;
    @wire(MessageContext) messageContext;
    @wire(searchEmployees, {searchTerm: '$searchTerm'})
    loadguides(result) {
        this.employees = result;
        if (result.data) {
            const message = {
                employees: result.data
            };
            publish(this.messageContext, EMPLOYEE_LIST_UPDATE_MESSAGE, message);
        }
    }
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.employees.data.length > 0);
	}
	handleEmployeeView(event) {
		// Get Employee record id from guideview event
		const employeeId = event.detail;
		// Navigate to Guide record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: employeeId,
				objectApiName: 'User_functional_role_junction__c',
				actionName: 'view',
			},
		});
	}
}




// import { LightningElement, wire } from 'lwc';
// import getContactList from '@salesforce/apex/GuideController.getContactList';

// export default class GuideList extends LightningElement {
//     contacts;
//     error;

//     @wire(getContactList)
//     wiredContacts({ data }) {
//         if (data) {
//             this.contacts = data;
//             this.error = undefined;
//         } 
//     }
// }