import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies()
const token = cookies['xicobless_token']

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        Authorization: `Bearer ${token}`,
    }
})