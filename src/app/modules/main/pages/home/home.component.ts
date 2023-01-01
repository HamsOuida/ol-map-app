import { Component } from '@angular/core';
import Map from 'ol/Map';
import { OSM } from 'ol/source';
import * as ol from 'ol';
import * as olProj from 'ol/proj';
import * as olGeom from 'ol/geom';
import * as olSource from 'ol/source';
import * as olLayer from 'ol/layer';
import * as olStyle from 'ol/style';
import { CoordinatesService } from '../../services/coordinates.service';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /** map */
  map!: Map;

  /** map vector layer */
  vectorLayer: any;

  /** map draw vector layer */
  drawVectorLayer: any;

  /** coordinates list */
  coordinatesList: any = [];

  /** show panel */
  showPanel: boolean = true;

  /** address info */
  address: any;

  /** address coordniates */
  addressLatLng: any;

  /** map marker */
  marker: any;

  constructor(private coordinatesService: CoordinatesService) {}

  ngOnInit(): void {
    this.initMap();
  }

  /**
   * this simple function created for initialization map
   * @returns map created and displayed
   */
  initMap() {
    this.vectorLayer = new olLayer.Vector({
      source: new olSource.Vector({ wrapX: false }),
      renderBuffer: 600,
    });
    this.drawVectorLayer = new olLayer.Vector({
      source: new olSource.Vector(),
    });
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new olLayer.Tile({
          source: new OSM(),
        }),
        this.vectorLayer,
        this.drawVectorLayer,
      ],
      view: new ol.View({
        center: olProj.fromLonLat([46.660464, 24.72617]), // first item in coordinates list
        zoom: 10,
      }),
    });
    this.getCoordinatesList();
  }

  /**
   * this simple function created for creating the marker and add it to the map
   * @param {lat,lng} Latitude and longitude
   * @returns marker created and added to the map
   */
  addMarker(lat: any, lng: any) {
    this.map.getView().animate({
      center: fromLonLat([parseFloat(lng), parseFloat(lat)]),
      zoom: 10,
    });
    const source = new olSource.Vector();
    this.marker = new olLayer.Vector({
      source: source,
      style: new olStyle.Style({
        image: new olStyle.Icon({
          anchor: [0.5, 1],
          src: 'https://ucarecdn.com/4b516de9-d43d-4b75-9f0f-ab0916bd85eb/marker.png',
        }),
      }),
      properties: { name: 'markLayer' },
    });
    this.map.addLayer(this.marker);
    let marker = new ol.Feature({
      geometry: new olGeom.Point(
        fromLonLat([parseFloat(lng), parseFloat(lat)])
      ),
    });
    this.marker.getSource().addFeature(marker);
    this.onGetAddress([lng, lat]);
  }

  /**
   * this simple function created for applying specific action when click on any place on map
   * @returns coordinates of clickable place on map
   */
  getCoord(event: any) {
    const coordinate = fromLonLat(this.map.getEventCoordinate(event));
  }

  /**
   * this simple function created for getting address when type on input field
   * @returns address
   */
  onSearchByCoordinates() {
    const addressInput = (document.getElementById('address')! as any).value;
    const coord = addressInput.split(',');
    this.addressLatLng = coord;
    this.removePerviousMarkers();
    this.addMarker(coord[1], coord[0]);
  }

  /**
   * this simple function created for getting address of coordinates
   * @param {coords} coordinates of address
   * @returns address
   */
  onGetAddress(coord: any) {
    this.coordinatesService.onReverseGeocode(coord).subscribe((res: any) => {
      this.address = res;
      this.addressLatLng = [res.lon, res.lat];
    });
  }

  /**
   * this simple function created for getting the coordinates list
   * @returns coordinates list
   */
  getCoordinatesList() {
    this.coordinatesService.getAllCoordinates().subscribe((res: any) => {
      this.coordinatesList = res.coordinates;
      this.drawAllMarkers();
    });
  }

  /**
   * this simple function created for drawing markers according to coordinates list
   * @returns marker displayed by interval
   */
  drawAllMarkers() {
    let index = 0;
    let min = 2;
    let max = 5;
    let timeInterval = min + Math.random() * (max - min);
    setInterval(() => {
      if (index < this.coordinatesList.length) {
        this.removePerviousMarkers();
        this.addMarker(
          this.coordinatesList[index].lat,
          this.coordinatesList[index].lng
        );
        index++;
      }
    }, timeInterval * 1000);
  }

  /**
   * this simple function created for removing pervious markers
   * @returns markers removed from map
   */
  removePerviousMarkers() {
    if (this.marker) {
      this.map.getLayers().forEach((layer) => {
        if (layer && layer.get('name') == 'markLayer') {
          this.map.removeLayer(layer);
        }
      });
    }
  }

  /**
   * this simple function created for closing the details panel
   * @returns panel closed
   */
  closeSideBar() {
    this.showPanel = false;
  }

  /**
   * this simple function created for toggling the details panel
   * @returns panel toggled (opened and closed)
   */
  openSidebar() {
    this.showPanel = !this.showPanel;
  }
}
