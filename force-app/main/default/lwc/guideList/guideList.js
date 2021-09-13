// import { LightningElement, wire } from 'lwc';
// import getGuideList from '@salesforce/apex/GuideController.getGuideList';

// // Import message service features required for publishing and the message channel
// // import { publish, MessageContext } from 'lightning/messageService';
// // import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

// export default class LmsPublisherWebComponent extends LightningElement {
//     @wire(getGuideList)
//     guides;

//     // @wire(MessageContext)
//     // messageContext;

//     // Respond to UI event by publishing message
//     handleGuideSelect(event) {
//         const payload = { recordId: event.target.guide.Id };

//         // publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
//     }
// }













// import { publish, MessageContext } from 'lightning/messageService';
// import GUIDE_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/GuideListUpdate__c';
import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire} from 'lwc';
import getGuideList from '@salesforce/apex/GuideController.getGuideList';
// import getTask from '@salesforce/apex/EmployeeTaskController.getTask';
// import searchGuides from '@salesforce/apex/GuideController.searchGuides';
export default class GuideList extends NavigationMixin(LightningElement) {
	// searchTerm = '';
	employeeList;
    @wire(getGuideList)
	guides;
    // @wire(MessageContext) messageContext;
    // @wire(searchGuides, {searchTerm: '$searchTerm'})
    // loadguides(result) {
    //     this.guides = result;
    //     if (result.data) {
    //         const message = {
    //             guides: result.data
    //         };
    //         publish(this.messageContext, GUIDE_LIST_UPDATE_MESSAGE, message);
    //     }
    // }
	// handleSearchTermChange(event) {
		
	// 	window.clearTimeout(this.delayTimeout);
	// 	const searchTerm = event.target.value;
		
	// 	this.delayTimeout = setTimeout(() => {
	// 		this.searchTerm = searchTerm;
	// 	}, 300);
	// }
	// get hasResults() {
	// 	return (this.guides.data.length > 0);
	// }
	handleGuideView(event) {
        const guideId = event.detail;
        this.employeeList = this.guides.data.find(guide => guide.Id === guideId);
		// console.log(event);
		// this.employeeList = event.detail;
	}
}