export interface Geofence {
  id: number;
  name: string;
  companyId: number;
  point1Lat: number;
  point1Lon: number;

  point2Lat: number;
  point2Lon: number;

  point3Lat: number;
  point3Lon: number;

  point4Lat?: number;
  point4Lon?: number;

  point5Lat?: number;
  point5Lon?: number;
}
