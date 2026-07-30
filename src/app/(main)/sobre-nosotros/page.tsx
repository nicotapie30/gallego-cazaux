import type { Metadata } from 'next';
import SobreNosotrosClient from './SobreNosotrosClient';

export const metadata: Metadata = {
  title: 'Quiénes Somos - Gallego Cazaux',
  description: 'Más de 8 años acompañando familias e inversores en Santa Rosa y toda la zona de La Pampa. Conocé nuestra historia y nuestros valores.',
  openGraph: {
    title: 'Quiénes Somos - Gallego Cazaux',
    description: 'Una empresa familiar con raíces en La Pampa. Abriendo puertas desde 2018.',
    type: 'website',
  },
};

export default function Page() {
  return <SobreNosotrosClient />;
}
