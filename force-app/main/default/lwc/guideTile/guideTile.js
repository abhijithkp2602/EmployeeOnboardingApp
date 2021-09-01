import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class GuideTile extends LightningElement {
    @api guide;
	// appResources = {
	// 	bearSilhouette: `${ursusResources}/img/standing-bear-silhouette.png`,
	// };
    // handleOpenRecordClick() {
    //     const selectEvent = new CustomEvent('bearview', {
    //         detail: this.bear.Id
    //     });
    //     this.dispatchEvent(selectEvent);
    // }
    
    // navitageToLWCWithoutAura(event) {
    //     event.preventDefault();
    //     let componentDef = {
    //         componentDef: "c:employeeTile",
    //         attributes: {
    //             label: 'Navigated From Another LWC Without Using Aura'
    //         }
    //     };
    //     // Encode the componentDefinition JS object to Base64 format to make it url addressable
    //     let encodedComponentDef = btoa(JSON.stringify(componentDef));
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__webPage',
    //         attributes: {
    //             url: '/one/one.app#' + encodedComponentDef
    //         }
    //     });
    // }
    
}