import Image from 'next/image';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation'


export default function Header() {
    return (
        <nav className='w-full bg-black text-white z-10 flex flex-row'>
            <div className='justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-6xl '>
                <div className='flex justify-between items-center py-3 md:py-6'>
                    <Link className='flex flex-row' href='/'>
                        <Image src='/icon.png' alt='icon' width={50} height={50} />
                        <h2 className='text-3xl font-bold uppercase md:text-2xl'>Levels</h2>
                    </Link>
                </div>
            </div>

            <div className='max-md:hidden ml-6'>
                <div className='flex place-items-center'>
                    <Link href='/add' className='text-2xl mx-3 py-2'>Add</Link>
                    <Link href='/team' className='text-2xl mx-3 py-2'>Team</Link>
                    <Link href='/discord' className='text-2xl mx-3 py-2'>Discord</Link>
                </div>
            </div>

            <div className='ml-auto mr-8 my-auto'>
                <Link className='text-3xl font-bold uppercase md:text-2xl' href='/login'>Login</Link>
            </div>
        </nav>
    ); // Space eveenly between divs in nav & center links in middle && Levels text center 
};