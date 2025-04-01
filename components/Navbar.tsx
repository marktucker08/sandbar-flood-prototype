'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropdownMenu from './DropdownMenu'
import { useSession, signOut } from 'next-auth/react'
import { UserCircle } from 'lucide-react'

const Navbar = () => {
  const { data: session } = useSession();
  const manageItems = [
    { label: 'My Clients', href: '/manage/clients/my' },
    { label: 'My Quotes', href: '/manage/quotes/my' },
    { label: 'My Policies', href: '/manage/policies/my' },
    { label: 'Agency Quotes', href: '/manage/quotes/agency' },
  ];

  const userMenuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Sign out', href: '#', onClick: () => signOut({ callbackUrl: '/sign-in' }) },
  ];

  return (
    <div className='px-5 py-3 bg-white/90 shadow-sm font-ar-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/' className="flex items-center">
                <Image src='/SandBar.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
                {session ? (
                    <>
                        <ul className="flex items-center gap-10 self-start justify-start pr-10 whitespace-nowrap">
                            <li>
                                <Link href='/admin/dashboard' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                    Admin Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href='/quote/new' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                    Create New Quote
                                </Link>
                            </li>
                            <li>
                                <DropdownMenu label="Manage" items={manageItems} />
                            </li>
                            <li>
                                <Link href='/help' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                    Help
                                </Link>
                            </li>
                        </ul>
                        <div className="flex items-center gap-2">
                            <UserCircle className="w-6 h-6 text-gray-700" />
                            <DropdownMenu 
                                label={session.user?.email || ''} 
                                items={userMenuItems} 
                            />
                        </div>
                    </>
                ) : (
                    <ul className="flex items-center gap-10">
                        <li>
                            <Link href='/help' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                Help
                            </Link>
                        </li>
                        <li>
                            <Link href='/sign-in' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                Login
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    </div>
  )
}

export default Navbar