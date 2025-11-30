import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl, { Map, MapMouseEvent } from 'mapbox-gl';
import { v4 as UUIDV4 } from 'uuid';

import { environment } from '../../../environments/environment';

import { Marker } from './../../interfaces/marker.interface';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('mapa');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    setTimeout((): void => {
      const element = this.divElement()?.nativeElement;
      if (!element) return;

      const map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.02893667658097, 19.626474936383353],
        zoom: 14
      });

      this.mapListeners(map);
    }, 80);
  }

  private mapListeners(map: Map): void {
    map.on('click', (event): void => this.mapClick(event, map));
    this.map.set(map);
  }

  mapClick(event: MapMouseEvent, map: Map): void {
    const color = '#xxxxxx'
      .replaceAll('x', (y): string => (Math.trunc(Math.random() * 16)).toString(16));

    const marker = new mapboxgl.Marker({
      draggable: false,
      color
    })
      .setLngLat(event.lngLat)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      marboxMarker: marker
    };

    this.markers.set([newMarker, ...this.markers()]);
  }

}
