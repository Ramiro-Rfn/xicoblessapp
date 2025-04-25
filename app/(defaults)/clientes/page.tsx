import ComponentsAppsContacts from '@/components/apps/customers/components-apps-contacts';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Clientes',
};

const Contacts = async () => {
    const cookie = cookies().get("xicobless_token");

    const TOKEN = cookie?.value

    const customersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers/all`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const customers = await customersResponse.json()

    return <ComponentsAppsContacts customers={customers} />;
};

export default Contacts;
