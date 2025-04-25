import ComponentsProprieties from '@/components/apps/proprieties/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};




const Contacts = async () => {
    const cookie = cookies().get("xicobless_token");

    const TOKEN = cookie?.value

    const projectsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects/all`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const projects = await projectsResponse.json()

    return <ComponentsProprieties projects={projects} />;
};

export default Contacts;
