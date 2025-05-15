import ComponentsProprietiesDetail from '@/components/apps/proprietiesDetail/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};

async function Contacts(props: {params: Promise<{ id: string }>}) {
    const params = await props.params;
    const cookie = (await cookies()).get("xicobless_token");

    const TOKEN = cookie?.value

    const projectResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/project/${params.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const project = await projectResponse.json()

    const phasesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/phases/all/${project.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const phases = await phasesResponse.json()

    const documentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/document/all/${project.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    });

    const documents = await documentsResponse.json();

    return <ComponentsProprietiesDetail project={project} documents={documents} phases={phases} />;
};

export default Contacts;
