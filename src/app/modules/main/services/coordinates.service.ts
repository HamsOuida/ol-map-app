import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoordinatesService {
  constructor(private http: HttpClient) {}

  /**
   * this simple function created for getting all the coordinates
   * @returns coordinates list
   */
  getAllCoordinates() {
    return this.http.get<any[]>('assets/data/coordinates.json');
  }

  /**
   * this simple function created for getting address information form coordinates
   * @param {coordinates} coordinates of location
   * @returns address information
   */
  onReverseGeocode(coords: any): any {
    return this.http
      .get<any>(
        'http://nominatim.openstreetmap.org/reverse?format=json&lon=' +
          Number(coords[0]) +
          '&lat=' +
          Number(coords[1])
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
