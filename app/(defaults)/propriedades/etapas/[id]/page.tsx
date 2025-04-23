import ComponentsProprietiesDetail from '@/components/apps/proprietiesPhaseDetail/components-apps-contacts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Propriedades',
};

function Contacts({ params}: {params: {id: string}}){

    const id: number = Number(params?.id)
    return <ComponentsProprietiesDetail id={id} />;
};

export default Contacts;