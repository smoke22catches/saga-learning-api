export const processingStatusValues = [
  'pending',
  'completed',
  'failed',
] as const;
export type ProcessingStatus = (typeof processingStatusValues)[number];
