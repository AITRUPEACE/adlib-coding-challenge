import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeatureService } from '../../services/service.feature';
import { Feature } from '../../models/feature';

@Component({
  selector: 'app-feature-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feature-create.component.html',
  styleUrls: ['./feature-create.component.scss']
})
export class FeatureCreateComponent {
  featureForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  complexityOptions = ['S', 'M', 'L', 'XL'];
  statusOptions = ['New', 'Active', 'Closed', 'Abandoned'];

  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    private router: Router
  ) {
    this.featureForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      estimatedComplexity: ['S', Validators.required],
      status: ['New', Validators.required],
      targetCompletionDate: ['', Validators.required],
      actualCompletionDate: ['']
    });
  }

  onSubmit() {
    if (this.featureForm.valid) {
      this.isLoading = true;
      this.error = null;

      const feature: Omit<Feature, 'id'> = {
        ...this.featureForm.value,
        targetCompletionDate: new Date(this.featureForm.value.targetCompletionDate),
        actualCompletionDate: this.featureForm.value.actualCompletionDate 
          ? new Date(this.featureForm.value.actualCompletionDate)
          : new Date()
      };

      this.featureService.createFeature(feature).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/feature/list']);
        },
        error: (error) => {
          this.isLoading = false;
          this.error = 'Failed to create feature. Please try again.';
          console.error('Error creating feature:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/feature/list']);
  }
} 