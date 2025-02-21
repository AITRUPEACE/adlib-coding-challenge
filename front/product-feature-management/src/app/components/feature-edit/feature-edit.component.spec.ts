import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FeatureEditComponent } from './feature-edit.component';
import { FeatureService } from '../../services/service.feature';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Feature } from '../../models/feature';


// using jasmine.createSpyObj to create a mock service
// this service tests the FeatureEditComponent
// it tests the loading and displaying of feature data
// it tests the updating of a featureq
describe('FeatureEditComponent', () => {
  let component: FeatureEditComponent;

  // fixture is a wrapper around the component
  // it provides access to the component instance and the component's DOM
  let fixture: ComponentFixture<FeatureEditComponent>;
  let featureService: jasmine.SpyObj<FeatureService>;
  let router: jasmine.SpyObj<Router>;

  // mock a test feature
  const mockFeature: Feature = {
    id: 1,
    title: 'Test Feature',
    description: 'Test Description',
    estimatedComplexity: 'M',
    status: 'New',
    targetCompletionDate: new Date('2024-12-31'),
    actualCompletionDate: new Date('2024-12-31')
  };

  beforeEach(async () => {
    const featureServiceSpy = jasmine.createSpyObj('FeatureService', ['getFeature', 'updateFeature']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FeatureEditComponent
      ],
      // using featureservice and router
      providers: [
        { provide: FeatureService, useValue: featureServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    // inject the feature service and router
    featureService = TestBed.inject(FeatureService) as jasmine.SpyObj<FeatureService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(FeatureEditComponent);
    component = fixture.componentInstance;
  });

  it('should load and display feature data', fakeAsync(() => {
    // Arrange
    featureService.getFeature.and.returnValue(of(mockFeature));
    
    // Act
    fixture.detectChanges(); // Triggers ngOnInit
    tick(); // Wait for async operations

    // Assert
    expect(featureService.getFeature).toHaveBeenCalledWith(1);
    expect(component.feature).toEqual(mockFeature);
    // make sure the form is populated with the actual specific feature data
    expect(component.featureForm.get('title')?.value).toBe(mockFeature.title);
    expect(component.featureForm.get('description')?.value).toBe(mockFeature.description);
    expect(component.featureForm.get('estimatedComplexity')?.value).toBe(mockFeature.estimatedComplexity);
    expect(component.featureForm.get('status')?.value).toBe(mockFeature.status);
  }));

  // test the updating of a feature
  it('should update feature successfully', fakeAsync(() => {
    // Arrange
    featureService.getFeature.and.returnValue(of(mockFeature));

    // test by updating title
    const updatedFeature: Feature = { 
      ...mockFeature, 
      title: 'Updated Title', 
      description: 'Updated Description', 
      // TODO: make estiamtedComplexity into a type or lookup table
      estimatedComplexity: 'L' as 'S' | 'M' | 'L' | 'XL',
      // TODO: make status into a type or lookup table
      status: 'Active' as 'New' | 'Active' | 'Closed' | 'Abandoned',
      targetCompletionDate: new Date('2026-12-31'),
      actualCompletionDate: new Date('2026-12-31')
    };
    featureService.updateFeature.and.returnValue(of(updatedFeature));

    // Act
    fixture.detectChanges(); // Load initial data
    tick(); // Wait for async operations
    
    component.featureForm.patchValue(updatedFeature);
    component.onSubmit();
    tick();

    // Assert
    expect(featureService.updateFeature).toHaveBeenCalledWith(1, jasmine.objectContaining({
      id: 1,
      title: 'Updated Title'
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/feature/list']);
  }));
}); 