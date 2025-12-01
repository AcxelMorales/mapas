import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import mapboxgl from 'mapbox-gl';

import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('mapa');
  map = signal<mapboxgl.Map | null>(null);
  coords = input.required<{ lng: number; lat: number }>();

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    setTimeout((): void => {
      const element = this.divElement()?.nativeElement;
      if (!element) return;

      const map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [this.coords().lng, this.coords().lat],
        zoom: 14,
        interactive: false,
        pitch: 30
      });

      const color = '#xxxxxx'.replaceAll('x', (_): string => Math.trunc(Math.random() * 16).toString(16));

      new mapboxgl.Marker({
        draggable: false,
        color,
      })
      .setLngLat([this.coords().lng, this.coords().lat])
      .addTo(map);
    }, 80);
  }

}
