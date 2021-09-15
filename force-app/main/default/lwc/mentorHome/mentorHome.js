import { LightningElement, track, wire, api} from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import Id from '@salesforce/user/Id';
import getEmployee from '@salesforce/apex/GuideEmployeeController.getEmployee';
import getTask from '@salesforce/apex/EmployeeTaskController.getTask';


export default class MentorHome extends LightningElement {

    @wire(getEmployee, { GuideId: Id }) 
    employees;

    mentorId = Id;
    

    @track tasks;
    @api guide;
    @api employee;
    @api task;
    // @track mentorid;

    @track userid;
    @track isModalOpen = false;
    @track closeModalOpen = false;


    // handleSelect(event) {
    //     event.preventDefault();
    //     this.guideidKey = event.currentTarget.dataset.guideid;
    //     console.log(this.guideidKey);
    //     getEmployee({
    //         GuideId : this.guideidKey
    //     }).then(result => {
    //         this.employees = result;
    //         console.log('this.employees' + JSON.stringify(this.employees));
    //     });
    //     this.mentorid = this.guideidKey;
    //     console.log('mentorid >>>' + JSON.stringify(this.mentorid));
    // }

    // showguide(event){
    //     event.preventDefault();
    //     this.employees = undefined;
    // }

    taskProgress(event){
        event.preventDefault();
        this.employeeidKey = event.currentTarget.dataset.employeeid;
        console.log(this.employeeidKey);
        getTask({
            EmployeeId : this.employeeidKey
        }).then(result => {
            this.tasks = result;
            console.log('this.tasks' + JSON.stringify(this.tasks));
        });
        this.userid = this.employeeidKey;
        console.log('userid' + JSON.stringify(this.userid));
    }

    showEmployee(event){
        event.preventDefault();
        this.tasks = undefined;
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
}