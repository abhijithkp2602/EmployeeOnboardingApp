import { publish, MessageContext } from 'lightning/messageService';
import GUIDE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/GuideListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire } from 'lwc';
/** BearController.searchguides(searchTerm) Apex method */
import searchGuides from '@salesforce/apex/GuideController.searchGuides';
export default class BearList extends NavigationMixin(LightningElement) {
	searchTerm = '';
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
		// Get Guide record id from guideview event
		const guideId = event.detail;
		// Navigate to Guide record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: guideId,
				objectApiName: 'User_Assigned_Task__c',
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