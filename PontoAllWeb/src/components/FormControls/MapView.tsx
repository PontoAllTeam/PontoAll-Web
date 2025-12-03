import { useEffect, useRef } from 'react';
import { BaseFieldProps } from './types';
import { FormField } from './FormField';

interface MapViewProps extends BaseFieldProps {
  height?: string;
  width?: string;
  center?: [number, number];
  zoom?: number;
  radius?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  onZoomChange?: (zoom: number) => void;
}

export default function MapView({
  height = '400px',
  width = '100%',
  center = [-20.268492773308502, -50.54902350892892],
  zoom = 18,
  radius = 0,
  label,
  error,
  required,
  onLocationSelect,
  onZoomChange,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = (window as any).L.map(mapRef.current).setView(center, zoom);

    (window as any).L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(map);

    // Criar ícone customizado com cor accent
    const accentIcon = (window as any).L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: var(--color-accent); width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5],
    });

    // Adicionar marcador arrastável com ícone customizado
    const marker = (window as any).L.marker(center, {
      draggable: true,
      icon: accentIcon,
    }).addTo(map);
    markerRef.current = marker;

    // Adicionar círculo da cerca
    const circle = (window as any).L.circle(center, {
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.2,
      radius: radius,
    }).addTo(map);
    circleRef.current = circle;

    // Evento de clique no mapa
    map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      circle.setLatLng([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    });

    // Evento de arrastar o marcador
    marker.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      circle.setLatLng([lat, lng]);
      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    });

    // Evento de mudança de zoom
    map.on('zoomend', () => {
      const currentZoom = map.getZoom();
      if (onZoomChange) {
        onZoomChange(currentZoom);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect, onZoomChange]);

  // Atualizar zoom quando prop zoom mudar
  useEffect(() => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom();
      if (currentZoom !== zoom) {
        mapInstanceRef.current.setZoom(zoom);
      }
    }
  }, [zoom]);

  // Atualizar apenas posição do marcador e círculo quando center mudar
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && circleRef.current) {
      markerRef.current.setLatLng(center);
      circleRef.current.setLatLng(center);
    }
  }, [center]);

  // Atualizar raio do círculo quando radius mudar
  useEffect(() => {
    if (circleRef.current && radius > 0) {
      circleRef.current.setRadius(radius);
    }
  }, [radius]);

  return (
    <FormField label={label} error={error} required={required}>
      <div
        ref={mapRef}
        style={{ height, width }}
        className='rounded-lg border border-gray-300 cursor-crosshair'
      />
    </FormField>
  );
}
