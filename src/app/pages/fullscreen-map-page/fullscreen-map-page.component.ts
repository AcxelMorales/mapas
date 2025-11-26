import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';

import mapboxgl from 'mapbox-gl';

import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  imports: [DecimalPipe, JsonPipe],
  selector: 'app-fullscreen-map-page',
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 30px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
      border: 1px solid #e2e8f0;
      width: 250px
    }
  `,
})
export class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('mapa');
  zoom = signal(14);
  cordinates = signal({
    lng: -74.5,
    lat: 40
  });

  map = signal<mapboxgl.Map | null>(null);

  zoomEffect = effect((): void => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    setTimeout((): void => {
      const element = this.divElement()?.nativeElement;
      if (!element) return;

      const map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [this.cordinates().lng, this.cordinates().lat],
        zoom: this.zoom(),
      });

      this.mapListeners(map);
    }, 80);
  }

  private mapListeners(map: mapboxgl.Map): void {
    map.on('zoomend', (event): void => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', (): void => {
      const center = map.getCenter();
      this.cordinates.set(center);
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }

}
