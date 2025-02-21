export interface Feature {
  id?: number;  // Optional for creation, required after saved
  title: string;
  description: string;  // Required
  estimatedComplexity: 'S' | 'M' | 'L' | 'XL';
  status: 'New' | 'Active' | 'Closed' | 'Abandoned';
  targetCompletionDate: Date;  // Required
  actualCompletionDate: Date;  // Required
}