import L from 'leaflet';
import { MapContainer, TileLayer, Marker, ZoomControl} from 'react-leaflet';
import markerIcon from '../public/images/icon-location.svg';
import sty from '../styles/Map.module.scss';

// const blackMarker = new L.Icon({
//   iconUrl: '../public/images/icon-location.svg',
//   iconSize: [46, 56],
//   iconAnchor: [23, 55],
// });


export default function Map({lat, lng}: {lat: number, lng: number}) {

  return (
    <MapContainer
      className={sty.map}
      center={[lat + 0.02, lng]}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position='bottomleft'/>
      <Marker position={[lat, lng]}/>
    </MapContainer>
  );
}
