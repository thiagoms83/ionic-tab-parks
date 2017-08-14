import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
import { ParkDetails } from '../park-details/park-details';
import { Park } from '../../app/interfaces/park';

/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Array<Park> = [];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkData: ParkData) {
    parkData.getParks().then(theResult => {
      this.parks = theResult;
    });
  }

  goParkDetails(theParkData) {
    this.navCtrl.push(ParkDetails, { parkData: theParkData });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

  getParks(event) {
    this.parkData.getParks().then(theResult => { this.parks = theResult });
    let queryString = event.target.value;
    if (queryString !== undefined) {
      if (queryString.trim() == '') {
        return;
      }
      this.parkData.getFilteredParks(queryString).then(theResult => { this.parks = theResult; });
    }
  }

  resetList(event) {
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;
    })
  }

  customHeaderFn(record, recordIndex, records) {
    let primeiraLetra = record.name.charAt(0);
    if (recordIndex > 0) {
      if (primeiraLetra == records[recordIndex - 1].name.charAt(0)) {
        return null;
      }
    }
    return primeiraLetra;
  }
}
