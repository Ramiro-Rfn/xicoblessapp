import ComponentsTaskMaterial from '@/components/apps/taskMaterials/components-taskMaterial';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Propriedades',
};

async function Contacts({ params}: {params: {id: string}}){
    const cookie = cookies().get("xicobless_token");

    const TOKEN = cookie?.value

    const taskMaterialsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/taskmaterials/all/${params.id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const taskMaterials = await taskMaterialsResponse.json()

    return <ComponentsTaskMaterial taskId={params.id} taskMaterials={taskMaterials} />;
};

export default Contacts;