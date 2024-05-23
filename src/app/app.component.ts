import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@maplibre/ngx-maplibre-gl';

import {
  Map,
  Marker,
  NavigationControl,
  LngLatLike,
  LngLat,
  LngLatBounds,
  Point,
} from 'maplibre-gl';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beningings';
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  marker: Marker;
  constructor() {}
  ngOnDestroy() {
    this.map?.remove();
  }
  ngOnInit(): void {}
  aMarker: any;
  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };
    const token = environment.token;
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=${token}`,
      // style: './../../../assets/map.style.json',
      // style:`https://api.maptiler.com/data/65427794-100e-425d-b631-2ff9ca13687b/features.json?key=CH1cYDfxBV9ZBu1lHGqh`,
      center: initialState,

      zoom: 3,
      hash: true,
    });

    // this.aMarker = new Marker(document.getElementById('marker')).setOffset([0, 0]).setDraggable(true).setLngLat([-108.54491326556354,70.3919058347233]).addTo(this.map);
    this.map.on('click', (e) => {
      if (e) {
        const coords = e.lngLat;
        const info = document.getElementsByClassName('info')[0];
    
        info.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;

        this.renderMarkerAtCoordinates(coords);
      }
    });
  }

  renderMarkerAtCoordinates(coords: LngLat): void {
    if (this.marker) {
      this.marker.remove();
    }

    const markerDiv = document.createElement('div');
    markerDiv.className = 'custom-marker';

    // Add the marker to the map
    this.marker = new Marker(markerDiv)
      .setDraggable(true)
      .setLngLat(coords)
      .addTo(this.map);
    this.marker.on('dragend', () => {
      this.onDragEnd();
    });
  }

  onDragEnd() {
    const lngLat = this.marker.getLngLat();
    const coordinates = document.getElementsByClassName('custom-marker');
    console.log(
      'corrdinates',
      `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`
    );
    const info = document.getElementsByClassName('info')[0];
    console.log('info', info);

    info.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
  }
}
