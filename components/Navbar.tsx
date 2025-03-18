'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DropdownMenu from './DropdownMenu'

const Navbar = () => {
  const manageItems = [
    { label: 'My Clients', href: '/manage/clients/my' },
    { label: 'My Quotes', href: '/manage/quotes/my' },
    { label: 'My Policies', href: '/manage/policies/my' },
    { label: 'Agency Quotes', href: '/manage/quotes/agency' },
  ];

  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/' className="flex items-center">
                <Image src='/SandBar.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
                <ul className="flex items-center gap-10 self-start justify-start pr-10 whitespace-nowrap">
                    <li>
                        <Link href='/admin/dashboard' className='text-gray-700 hover:text-gray-900 py-2 block'>
                            Admin Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href='/quote/new' className='text-gray-700 hover:text-gray-900 py-2 block'>
                            Create New Quote
                        </Link>
                    </li>
                    <li>
                        <DropdownMenu label="Manage" items={manageItems} />
                    </li>
                    <li>
                        <Link href='/help' className='text-gray-700 hover:text-gray-900 py-2 block'>
                            Help
                        </Link>
                    </li>
                </ul>
                <Link href='/sign-in' className='text-gray-700 hover:text-gray-900 py-2 block'>
                    Logout
                </Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar