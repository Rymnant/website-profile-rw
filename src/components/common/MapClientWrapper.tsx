import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'));

interface MapClientWrapperProps {
    center: { lat: number; lng: number };
    zoom: number;
}

const MapClientWrapper = ({ center, zoom }: MapClientWrapperProps) => {
    return <MapClient center={[center.lat, center.lng]} zoom={zoom} />;
};

export default MapClientWrapper;