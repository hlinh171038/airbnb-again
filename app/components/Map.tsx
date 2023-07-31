"use client"

import L from 'leaflet';
import { MapContainer, Marker, TileLayer} from 'react-leaflet';

 import "leaflet/dist/leaflet.css";

interface MapProps {
    center?: number[]
}
const Map:React.FC<MapProps> =({
    center
}) =>{
    return (
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.09]}
            zoom={center ? 4: 2}
            scrollWheelZoom={false}
            className='h-[60vh] rounded-lg'
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker 
                    position={center as L.LatLngExpression}
                />
            )}
        </MapContainer>
    )
}

export default Map