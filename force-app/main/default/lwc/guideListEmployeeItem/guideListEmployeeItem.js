import { LightningElement, api } from 'lwc';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';

export default class GuideListEmployeeItem extends LightningElement {
    @api guide;

    handleSelect(event) {

        getEmployee({
            GuideId : event.target.dataset.guideid
        }).then(employeeList => {
            const selectedEvent = new CustomEvent('guideview', {
                detail : employeeList
            });

        // Dispatches the event.
            this.dispatchEvent(selectedEvent);
            console.log(employeeList)
        });

        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        // event.preventDefault();
        
        // // 2. Create a custom event that bubbles. Read about event best practices at http://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.events_best_practices
        // const selectEvent = new CustomEvent('guideselect', {
        //     bubbles: true
        // });
        // // 3. Fire the custom event
        // this.dispatchEvent(selectEvent);
    }
}