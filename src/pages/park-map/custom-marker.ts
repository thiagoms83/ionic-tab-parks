import { Park } from '../../app/interfaces/park';

export class CustomMapMarker extends google.maps.Marker {
    parkData: Park
    constructor(theParkData:Park) {
        super();
        this.parkData = theParkData;
    }
}