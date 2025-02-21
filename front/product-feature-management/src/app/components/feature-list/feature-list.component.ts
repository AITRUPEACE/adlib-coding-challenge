import { Component, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeatureService } from '../../services/service.feature';
import { Feature } from '../../models/feature';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmationModalComponent],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent implements OnInit {
  features: Feature[] = [];
  selectedFeature: Feature | null = null;
  isLoading = false;
  error: string | null = null;

  // Modal state
  showDeleteModal = false;
  featureToDelete: Feature | null = null;

  constructor(private featureService: FeatureService) {}

  // lifecycle hook that called after Angular has initialized all properties
  ngOnInit(): void{
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.isLoading = true;
    this.error = null;
    
    this.featureService.getFeatures().subscribe({
      next: (features) => {
        this.features = features;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading features:', error);
        this.error = 'Failed to load features. Please try again later.';
        this.isLoading = false;
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
        // Or alternatively we can call this.loadFeatures() to refresh the list from the server;
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
        // Or alternatively we can call this.loadFeatures() to refresh the list from the server;
        // Consider toast!
      },
      error: (error) => {
        console.error('Error updating feature:', error);
        // Consider toast!
      }
    });
  }

  // New methods for delete confirmation
  openDeleteModal(feature: Feature) {
    this.featureToDelete = feature;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.featureToDelete = null;
  }

  confirmDelete() {
    if (this.featureToDelete?.id) {
      this.deleteFeature(this.featureToDelete.id);
      this.closeDeleteModal();
    }
  }

  deleteFeature(id: number) {
    this.featureService.deleteFeature(id).subscribe({
      next: () => {
        console.log('Feature deleted:', id);
        // Remove the feature from the list
        this.features = this.features.filter(f => f.id !== id);
        // Or alternatively we can call this.loadFeatures() to refresh the list from the server;
        // Consider toast!
      },
      error: (error) => {
        console.error('Error deleting feature:', error);
        // Consider toast!
      }
    });
  }
}