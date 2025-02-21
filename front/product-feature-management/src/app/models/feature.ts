export interface Feature {
  id: number;
  title: string;
  description?: string;
  estimatedComplexity: 'S' | 'M' | 'L' |
   'XL';
   status: 'New' | 'Active' | 'Closed' | 'Abandoned';
   targetCompletionDate?: Date;
   actualCompletionDate?: Date;
}