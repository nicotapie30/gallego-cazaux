import type { Metadata } from 'next';
import SobreNosotrosClient from './SobreNosotrosClient';

export const metadata: Metadata = {
  title: 'Quiénes Somos - Gallego Cazaux',
  description: 'Más de 20 años acompañando familias e inversores en Santa Rosa, La Pampa. Conocé nuestra historia y nuestros valores.',
  openGraph: {
    title: 'Quiénes Somos - Gallego Cazaux',
    description: 'Una empresa familiar con raíces en La Pampa. Abriendo puertas desde 2003.',
    type: 'website',
  },
};

export default function Page() {
  return <SobreNosotrosClient />;
}
