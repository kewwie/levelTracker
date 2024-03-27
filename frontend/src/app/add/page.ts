import { redirect, RedirectType } from 'next/navigation'

export default async function Login() {
    redirect("https://discord.com/oauth2/authorize?client_id=1154326101695397889", RedirectType.replace); 
}