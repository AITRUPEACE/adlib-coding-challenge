import { Routes } from '@angular/router';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feature/list', pathMatch: 'full' },
  { path: 'feature/list', component: FeatureListComponent }
];
