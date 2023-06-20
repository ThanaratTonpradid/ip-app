export interface AccessInfoPayload {
  userAgent: string;
  ipAddress: string;
  isp: string;
  countryCode: string;
  countryName: string;
  city: string;
  zipCode: string;
  timezone: string;
  latitude: number;
  longitude: number;
  accuracyRadius: number;
}
