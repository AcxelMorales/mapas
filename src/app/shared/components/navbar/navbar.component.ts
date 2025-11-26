import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { filter, map } from 'rxjs';

import { routes } from '../../../app.routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [AsyncPipe, RouterLink]
})
export class NavbarComponent {

  router = inject(Router);

  routes = routes.map((route) => ({
    path: route.path,
    title: route.title ?? 'Mapas en Angular'
  })).filter(route => route.path !== '**');

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event) => event.url),
    map((url) => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas')
  );

}
