import { publish, MessageContext } from 'lightning/messageService';
import GUIDE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/GuideListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire} from 'lwc';
// import getTask from '@salesforce/apex/EmployeeTaskController.getTask';
import searchGuides from '@salesforce/apex/GuideController.searchGuides';
export default class BearList extends NavigationMixin(LightningElement) {
	searchTerm = '';
	employeeList;
	guides;
    @wire(MessageContext) messageContext;
    @wire(searchGuides, {searchTerm: '$searchTerm'})
    loadguides(result) {
        this.guides = result;
        if (result.data) {
            const message = {
                guides: result.data
            };
            publish(this.messageContext, GUIDE_LIST_UPDATE_MESSAGE, message);
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
		return (this.guides.data.length > 0);
	}
	handleGuideView(event) {
		console.log(event);
		this.employeeList = event.detail;
	}
	// handleClick(event) {
    //     getTask({
    //         TaskId : event.target.dataset.taskid
    //     })
	// 	// .then(employeeList => {
    //     //     const selectedEvent = new CustomEvent('guideview', {
    //     //         detail : employeeList
    //     //     });

    //     // Dispatches the event.
    //     //     this.dispatchEvent(selectedEvent);
    //     //     console.log(employeeList)
    //     // });
	// 	this.dispatchEvent;
    // }
}