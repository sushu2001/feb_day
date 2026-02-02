import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SurpriseComponent } from './surprise.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(
      RouterModule.forRoot([
        { path: '', component: HomeComponent },
        { path: 'surprise', component: SurpriseComponent },
        { path: '**', redirectTo: '' }
      ])
    )
  ]
};
