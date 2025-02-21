import { Routes } from '@angular/router';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

export const routes: Routes = [
  { path: 'feature', children: [
    { path: 'list', component: FeatureListComponent }
  ]},
  { path: '', redirectTo: 'feature/list', pathMatch: 'full' }
];
