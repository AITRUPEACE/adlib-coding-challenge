import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureService } from './service.feature';
import { Feature } from '../models/feature';
import { environment } from '../../environments/environment';

describe('FeatureService', () => {
  let service: FeatureService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  const mockFeature: Feature = {
    id: 1,
    title: 'Test Feature',
    description: 'Test Description',
    estimatedComplexity: 'M',
    status: 'New',
    targetCompletionDate: new Date('2024-12-31'),
    actualCompletionDate: new Date('2024-12-31')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureService]
    });

    service = TestBed.inject(FeatureService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFeatures', () => {
    it('should return all features', () => {
      const mockFeatures: Feature[] = [mockFeature];

      service.getFeatures().subscribe(features => {
        expect(features).toEqual(mockFeatures);
      });

      const req = httpMock.expectOne(`${apiUrl}/ProductFeature`);
      expect(req.request.method).toBe('GET');
      req.flush(mockFeatures);
    });
  });

  describe('getFeature', () => {
    it('should return a single feature', () => {
      service.getFeature(1).subscribe(feature => {
        expect(feature).toEqual(mockFeature);
      });

      const req = httpMock.expectOne(`${apiUrl}/ProductFeature/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockFeature);
    });
  });

  describe('createFeature', () => {
    it('should create a new feature', () => {
      const newFeature: Omit<Feature, 'id'> = {
        title: 'New Feature',
        description: 'New Description',
        estimatedComplexity: 'S',
        status: 'New',
        targetCompletionDate: new Date('2024-12-31'),
        actualCompletionDate: new Date('2024-12-31')
      };

      service.createFeature(newFeature).subscribe(feature => {
        expect(feature).toEqual({ ...newFeature, id: 1 });
      });

      const req = httpMock.expectOne(`${apiUrl}/ProductFeature`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newFeature);
      req.flush({ ...newFeature, id: 1 });
    });
  });

  describe('updateFeature', () => {
    it('should update an existing feature', () => {
      const updatedFeature: Feature = {
        ...mockFeature,
        title: 'Updated Feature'
      };

      service.updateFeature(1, updatedFeature).subscribe(feature => {
        expect(feature).toEqual(updatedFeature);
      });

      const req = httpMock.expectOne(`${apiUrl}/ProductFeature/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedFeature);
      req.flush(updatedFeature);
    });
  });

  describe('deleteFeature', () => {
    it('should delete a feature', () => {
      service.deleteFeature(1).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/ProductFeature/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
}); 