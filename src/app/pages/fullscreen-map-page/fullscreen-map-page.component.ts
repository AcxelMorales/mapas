import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('mapa');
  private map?: mapboxgl.Map;

  ngAfterViewInit(): void {
    if (!this.divElement()) return;

    setTimeout(() => {
      const element = this.divElement()?.nativeElement;
      if (!element) return;

      this.map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9,
      });
    }, 80);
  }

}
