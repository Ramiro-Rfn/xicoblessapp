import ComponentsProprietiesDetail from '@/components/apps/proprietiesPhaseDetail/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};

async function Contacts(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const cookie = (await cookies()).get("xicobless_token");

    const TOKEN = cookie?.value

    const phaseResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/phase/${params.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const phase = await phaseResponse.json()

    console.log(phase)

    const tasksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tasks/all/${phase.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const tasks = await tasksResponse.json()

    return <ComponentsProprietiesDetail phase={phase} tasks={tasks} />;
};

export default Contacts;