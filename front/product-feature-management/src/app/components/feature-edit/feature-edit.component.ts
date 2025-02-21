import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FeatureService } from '../../services/service.feature';
import { Feature } from '../../models/feature';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-feature-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmationModalComponent],
  templateUrl: './feature-edit.component.html',
  styleUrls: ['./feature-edit.component.scss']
})
export class FeatureEditComponent implements OnInit {
  featureForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  featureId: number | null = null;
  feature: Feature | null = null;

  // Modal state
  showDeleteModal = false;

  complexityOptions = ['S', 'M', 'L', 'XL'];
  statusOptions = ['New', 'Active', 'Closed', 'Abandoned'];

  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.featureForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(1000)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      estimatedComplexity: ['S', Validators.required],
      status: ['New', Validators.required],
      targetCompletionDate: ['', Validators.required],
      actualCompletionDate: ['']
    });
  }

  ngOnInit() {
    // Get the feature ID from the route parameters
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.featureId = +params['id'];
        this.loadFeature(this.featureId);
      }
    });
  }

  loadFeature(id: number) {
    this.isLoading = true;
    this.error = null;

    this.featureService.getFeature(id).subscribe({
      next: (feature) => {
        this.feature = feature;
        this.featureForm.patchValue({
          ...feature,
          targetCompletionDate: this.formatDateForInput(feature.targetCompletionDate),
          actualCompletionDate: feature.actualCompletionDate ? 
            this.formatDateForInput(feature.actualCompletionDate) : ''
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading feature:', error);
        this.error = 'Failed to load feature. Please try again.';
        this.isLoading = false;
      }
    });
  }

  formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.featureForm.valid && this.featureId) {
      this.isLoading = true;
      this.error = null;

      // update our feature with form values
      const feature: Feature = {
        id: this.featureId,
        ...this.featureForm.value,
        targetCompletionDate: new Date(this.featureForm.value.targetCompletionDate),
        actualCompletionDate: this.featureForm.value.actualCompletionDate 
          ? new Date(this.featureForm.value.actualCompletionDate)
          : null
      };

      this.featureService.updateFeature(this.featureId, feature).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/feature/list']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Failed to update feature.';
          console.error('Error updating feature:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/feature/list']);
  }

  // Delete methods
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.featureId) {
      this.isLoading = true;
      this.error = null;

      this.featureService.deleteFeature(this.featureId).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/feature/list']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Failed to delete feature.';
          console.error('Error deleting feature:', error);
        }
      });
    }
    this.closeDeleteModal();
  }
} 