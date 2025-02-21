import { Routes } from '@angular/router';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { FeatureCreateComponent } from './components/feature-create/feature-create.component';

export const routes: Routes = [
  { path: 'feature', children: [
    { path: 'list', component: FeatureListComponent },
    { path: 'create', component: FeatureCreateComponent }
  ]},
  { path: '', redirectTo: 'feature/list', pathMatch: 'full' }
];
