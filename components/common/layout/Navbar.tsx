'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DropdownMenu from '@/components/common/layout/DropdownMenu';
import { UserCircle, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        // Optionally show toast notification
      }
      router.push('/sign-in');
    } catch (error) {
      console.error('Unexpected sign out error:', error);
    }
  };

  const manageItems = [
    { label: 'My Clients', href: '/manage/clients/my' },
    { label: 'My Quotes', href: '/manage/quotes/my' },
    { label: 'My Policies', href: '/manage/policies/my' },
    { label: 'Agency Quotes', href: '/manage/quotes/agency' },
  ];

  const userMenuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Sign out', href: '#', onClick: handleSignOut },
  ];

  return (
    <div className='px-5 py-3 bg-white/90 shadow-sm font-ar-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/' className="flex items-center">
                <Image src='/SandBar.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
                {user ? (
                    <>
                        <ul className="flex items-center gap-10 self-start justify-start pr-10 whitespace-nowrap">
                           
                            <li>
                                <Link href='/quote/new' className='bg-amber-200 text-gray-700 px-4 py-2 rounded-md hover:bg-amber-400 transition-colors duration-200 font-medium'>
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
                            <li>
                                <Link href='/admin/dashboard' className='text-gray-700 hover:text-amber-600 py-2 block transition-colors duration-200'>
                                    <span className='flex items-center gap-1.5 '>
                                        <Settings className="w-5 h-5 text-gray-700" />
                                        Admin
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <div className="flex items-center gap-1.5">
                            <UserCircle className="w-5 h-5 text-gray-700" />
                            <DropdownMenu 
                                label={user.email || ''} 
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