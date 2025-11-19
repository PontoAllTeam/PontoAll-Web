export interface Geofence {
  id: number;
  name: string;
  centerLatitude: number;
  centerLongitude: number;
  radiusInMeters: number;
  companyId: number;
}
