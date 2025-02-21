import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FeatureListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'product-feature-management';
}
