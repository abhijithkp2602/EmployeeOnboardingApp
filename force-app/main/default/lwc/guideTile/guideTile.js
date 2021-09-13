import { LightningElement, api, wire} from 'lwc';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';
import getGuideList from '@salesforce/apex/GuideController.getGuideList';

export default class GuideTile extends LightningElement {
    @api guide;
    guideid;
    @wire(getGuideList)
    guides;

    handleClick(event){
        // event.preventDefault();
        this.guideid = event.currentTarget.dataset.guideid;
        console.log(this.guideid);
        const selectedEvent = new CustomEvent('selected',{
            detail: this.guideid
        });
        this.dispatchEvent(selectedEvent);
    }

    // handleClick(event) {
    //     getEmployee({
    //         GuideId : event.currentTarget.dataset.guideid
    //     }).then(employeeList => {
    //         const selectedEvent = new CustomEvent('guideview', {
    //             detail : employeeList
    //         });
    //     // Dispatches the event.
    //         this.dispatchEvent(selectedEvent);
            
    //         console.log(employeeList)
    //     });
    //     this.dispatchEvent();
    // }
}