
import Employees from "@/components/apps/Equipa/employees";
import { cookies } from "next/headers";

export default async function Equipa() {
    const cookie = (await cookies()).get("xicobless_token");

    const TOKEN = cookie?.value

    const customersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/employees/all`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        }
    })

    const customers = await customersResponse.json()

    return <Employees employees={customers} />
}