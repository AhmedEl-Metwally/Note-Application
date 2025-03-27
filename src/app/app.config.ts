import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';



export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(
        routes,
        withViewTransitions(),
        withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
        withHashLocation()
      ),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor , errorsInterceptor])),
      provideAnimations(), 
      provideToastr(), 
      importProvidersFrom(NgxSpinnerModule)
    ]
};
