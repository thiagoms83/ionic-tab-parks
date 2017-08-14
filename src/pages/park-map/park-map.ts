import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
import { Park } from '../../app/interfaces/park';
import { CustomMapMarker } from './custom-marker';
import { ParkDetails } from '../park-details/park-details';

//declare var google: any;

/*
  Generated class for the ParkMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-map',
  templateUrl: 'park-map.html'
})
export class ParkMapPage {
  map: google.maps.Map;
  parks: Array<Park> = [];
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public parkData: ParkData) {
    this.map = null;

    //this.platform.ready().then(() => { this.initializeMap(); });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkMapPage');
    this.initializeMap();
  }

  initializeMap() {
    let minZoomLevel = 3;
    
    this.map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: minZoomLevel,
      center: new google.maps.LatLng(39.833, -98.583),
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    let image = 'assets/img/nps_arrowhead.png';
    this.parkData.getParks().then(theResult => {
      this.parks = theResult;

      for(let thePark of this.parks) {
        let parkPos:google.maps.LatLng = new google.maps.LatLng (thePark.lat, thePark.long);
        let parkMarker:google.maps.Marker = new CustomMapMarker(thePark);
        parkMarker.setPosition(parkPos);
        parkMarker.setMap(this.map);
        parkMarker.setIcon(image);

        google.maps.event.addListener(parkMarker, 'click', () => {
          let selectMarker:any = parkMarker;
          this.navCtrl.push(ParkDetails, {
            parkData: selectMarker.parkData
          })
        })
      }
    })
  }

}
