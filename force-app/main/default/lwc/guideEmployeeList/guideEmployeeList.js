import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// Import message service features required for subscribing and the message channel
import { subscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

import NAME_FIELD from '@salesforce/schema/User.Name';
import PICTURE_FIELD from '@salesforce/schema/User.FullPhotoUrl';

const fields = [
    NAME_FIELD,
    PICTURE_FIELD
];

export default class GuideEmployeeList extends LightningElement {
    subscription = null;
    recordId;

    Name;
    FullPhotoUrl;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchToast(error);
        } else if (data) {
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        }
    }

    // By using the MessageContext @wire adapter, unsubscribe will be called
    // implicitly during the component descruction lifecycle.
    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.recordId;
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}