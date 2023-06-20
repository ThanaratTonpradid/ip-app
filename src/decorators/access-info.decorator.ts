import { createParamDecorator } from '@nestjs/common';
import { readFileSync } from 'fs';
import { get } from 'lodash';
import { AsnResponse, CityResponse, Reader } from 'maxmind';
import { AccessInfoPayload } from '../interfaces/access-info-payload.interface';

const bufferAsn = readFileSync(`${process.cwd()}/geoip/GeoLite2-ASN.mmdb`);
const bufferCity = readFileSync(`${process.cwd()}/geoip/GeoLite2-City.mmdb`);
const lookupAsn = new Reader<AsnResponse>(bufferAsn);
const lookupCity = new Reader<CityResponse>(bufferCity);

export const AccessInfo = createParamDecorator(
  (_, input): AccessInfoPayload => {
    const prefix = input?.headers ? '' : '[2].req.';
    const userAgent = get(input, `${prefix}headers.user-agent`, '');
    const xForwardedFor = get(input, `${prefix}headers.x-forwarded-for`, '');
    const connectionIp = get(input, `${prefix}connection.remoteAddress`, '');
    const ipAddress = xForwardedFor.split(',').shift().trim() || connectionIp;
    const asn = lookupAsn.get(ipAddress);
    const city = lookupCity.get(ipAddress);
    return {
      userAgent,
      ipAddress: xForwardedFor || connectionIp,
      isp: get(asn, 'autonomous_system_organization', ''),
      timezone: get(city, 'location.time_zone', ''),
      countryCode: get(city, 'country.iso_code', ''),
      countryName: get(city, 'country.names.en', ''),
      city: get(city, 'city.names.en', ''),
      zipCode: get(city, 'postal.code', ''),
      latitude: get(city, 'location.latitude', ''),
      longitude: get(city, 'location.longitude', ''),
      accuracyRadius: get(city, 'location.accuracy_radius', ''),
    };
  },
);