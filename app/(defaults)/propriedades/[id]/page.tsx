import ComponentsProprietiesDetail from '@/components/apps/proprietiesDetail/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};

async function Contacts({ params}: {params: {id: string}}){
    const cookie = cookies().get("xicobless_token");

    const TOKEN = cookie?.value

    const projectResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/project/${params.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const project = await projectResponse.json()

    console.log(project)

    const id: number = Number(params?.id)
    return <ComponentsProprietiesDetail project={project} />;
};

export default Contacts;
