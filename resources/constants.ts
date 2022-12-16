import {QueryResult} from './types';

// Break points in pixels.
export const break1160 = 1160;
export const break840 = 840;

// Heights of background image at different
// break points, in pixels.
export const bgImgHeightDesktop = 280;
export const bgImgHeightMobile = 300;

// Regular expression for a domain name.
export const domainNameRe: RegExp
  = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

// Sample IP query
export const gnuDomain: QueryResult = {
  ip: '209.51.188.116',
  region: 'Florida',
  city: 'Sarasota',
  lat: 27.33643,
  lng: -82.53065,
  postalCode: '34230',
  timezone: '-05:00',
  isp: 'Hurricane Electric LLC'
}

// Sample object from API call
export const googleDomain = {
  "ip": "8.8.8.8",
  "location": {
      "country": "US",
      "region": "California",
      "city": "Mountain View",
      "lat": 37.40599,
      "lng": -122.078514,
      "postalCode": "94043",
      "timezone": "-07:00",
      "geonameId": 5375481
  },
  "domains": [
      "0d2.net",
      "003725.com",
      "0f6.b0094c.cn",
      "007515.com",
      "0guhi.jocose.cn"
  ],
  "as": {
      "asn": 15169,
      "name": "Google LLC",
      "route": "8.8.8.0/24",
      "domain": "https://about.google/intl/en/",
      "type": "Content"
  },
  "isp": "Google LLC"
}