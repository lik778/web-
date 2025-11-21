
export interface Destination {
  id: string;
  name: string;
  type: string;
  distance: string;
  description: string;
  color: string;
  imagePlaceholder: string;
}

export type TravelStatus = 'IDLE' | 'WARPING' | 'ARRIVED';

export interface LogEntry {
  timestamp: string;
  message: string;
}
