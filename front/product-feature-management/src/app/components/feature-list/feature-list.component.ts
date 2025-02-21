import { Component, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FeatureService } from '../../services/service.feature';
import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];
  selectedFeature: Feature | null = null;

  constructor(private featureService: FeatureService) {}

  // lifecycle hook that called after Angular has initialized all properties
  ngOnInit(): void{
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.featureService.getFeatures().subscribe({
      next: (features) => {
        this.features = features;
      },
      error: (error) => {
        console.error('Error loading features:', error);
        // Consider toast!
      }
    });
  }

  getFeature(id: number): void {
    this.featureService.getFeature(id).subscribe({
      next: (feature) => {
        this.selectedFeature = feature;
        console.log('Feature loaded:', feature);
        // Consider toast!
      },
      error: (error) => {
        console.error('Error getting feature:', error);
        // Consider toast!
      }
    });
  }

  createFeature() {
    const newFeature: Omit<Feature, 'id'> = {
      title: 'New Feature',
      description: 'Description',
      estimatedComplexity: 'S',
      status: 'New',
      targetCompletionDate: new Date(),
      actualCompletionDate: new Date()
    };

    this.featureService.createFeature(newFeature).subscribe({
      next: (createdFeature) => {
        console.log('Feature created:', createdFeature);
        // Add the new feature to the list or refresh the list
        this.features = [...this.features, createdFeature];
        // Or alternatively we can call this.loadFeatures() to refresh the lis from the server;
        // Consider toast!
      },
      error: (error) => {
        console.error('Error creating feature:', error);
        // Consider toast!
      }
    });
  }

  updateFeature(feature: Feature) {
    // if feature doesn't have ID, we can't update it, so return
    if (!feature.id) return;

    this.featureService.updateFeature(feature.id, feature).subscribe({
      next: (updatedFeature) => {
        console.log('Feature updated:', updatedFeature);
        // Update the feature in the list
        this.features = this.features.map(f => 
          f.id === updatedFeature.id ? updatedFeature : f
        );
        this.selectedFeature = null;
        // Or alternatively we can call this.loadFeatures() to refresh the lis from the server;
        // Consider toast!
      },
      error: (error) => {
        console.error('Error updating feature:', error);
        // Consider toast!
      }
    });
  }

  deleteFeature(id: number) {
    this.featureService.deleteFeature(id).subscribe({
      next: () => {
        console.log('Feature deleted:', id);
        // Remove the feature from the list
        this.features = this.features.filter(f => f.id !== id);
        // Or alternatively we can call this.loadFeatures() to refresh the lis from the server;
        // Consider toast!
      },
      error: (error) => {
        console.error('Error deleting feature:', error);
        // Consider toast!
      }
    });
  }
}