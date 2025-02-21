import {Component, OnInit} from '@angular/core';
import {FeatureService} from '../services/service.feature';
import {Feature} from '../models/feature';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];

  constructor(private featureService: FeatureService){}

  // lifecycle hook that called after Angular has initialized all properties
  ngOnInit(): void{
    this.loadFeatures();
  }

  loadFeatures(): void {
    // subscribes to the observable returned by the getFeatures method of the featureService
    this.featureService.getFeatures().subscribe(features => this.features = features);
  }
}