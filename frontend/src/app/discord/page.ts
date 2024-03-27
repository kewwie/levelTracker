import { redirect, RedirectType } from 'next/navigation'

export default async function Login() {
    redirect("https://discord.gg/zA6nSEh2ST", RedirectType.replace); 
}