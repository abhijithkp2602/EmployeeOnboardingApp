import { LightningElement, api} from 'lwc';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';

export default class GuideTile extends LightningElement {
    @api guide;
    handleClick(event) {
        getEmployee({
            GuideId : event.target.dataset.guideid
        }).then(employeeTask => {
            const selectedEvent = new CustomEvent('guideview', {
                detail : employeeTask
            });

        // Dispatches the event.
            this.dispatchEvent(selectedEvent);
            console.log(employeeTask)
        });
    }
}