import { enableProdMode, provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';
import { HTTP_PROVIDERS } from '@angular/http';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
