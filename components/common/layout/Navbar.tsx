'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import DropdownMenu from '@/components/common/layout/DropdownMenu';
// import { Settings, UserCircle } from 'lucide-react';
// import { useSupabaseSessionContext } from "@/context/SupabaseSessionContext";
// import { supabase } from "@/lib/utils/utils";

const Navbar = () => {
  // const { user, loading } = useSupabaseSessionContext();
  // const manageItems = [
  //   { label: 'My Clients', href: '/manage/clients/my' },
  //   { label: 'My Quotes', href: '/manage/quotes/my' },
  //   { label: 'My Policies', href: '/manage/policies/my' },
  //   { label: 'Agency Quotes', href: '/manage/quotes/agency' },
  // ];

  // const userMenuItems = [
  //   { label: 'Profile', href: '/profile' },
  //   { label: 'Sign out', href: '#', onClick: async () => {
  //       await supabase.auth.signOut();
  //       window.location.href = '/sign-in';
  //     }
  //   },
  // ];

  return (
    <div className='px-5 py-3 bg-white/90 shadow-sm font-ar-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/' className="flex items-center">
                <Image src='/SandBar.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
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
            </div>
        </nav>
    </div>
  )
}

export default Navbar