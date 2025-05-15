import ComponentsStock from '@/components/apps/stock/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};

const Contacts = async () => {
    const cookie = (await cookies()).get("xicobless_token");

    const TOKEN = cookie?.value

    const materialsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/materials/all`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const materials = await materialsResponse.json()

    console.log(materials)


    return <ComponentsStock materials={materials} />;
};

export default Contacts;
