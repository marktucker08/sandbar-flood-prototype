import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href='/'>
                <Image src='/SandBar.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5'>
                <>
                    <ul className="flex gap-10 self-start justify-start pr-10 whitespace-nowrap">
                        <li>
                            <Link href='/quote/new'>
                            <p className='text-gray-700 hover:text-gray-900'>Create New Quote</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='#quotes'>
                            <p className='text-gray-700 hover:text-gray-900'>My Quotes</p>
                            </Link>
                        </li>
                        <li>
                        <Link href='#quotes'>
                            <p className='text-gray-700 hover:text-gray-900'>Agency Quotes</p>
                            </Link>
                        </li>
                        <li>
                        <Link href='#help'>
                            <p className='text-gray-700 hover:text-gray-900'>Help</p>
                            </Link>
                        </li>
                    </ul>
                    <Link href='/sign-in'>
                        <p className='text-gray-700 hover:text-gray-900'>Logout</p>
                    </Link>
                    {/* <Link href='/signup'>
                        <p className='text-gray-700 hover:text-gray-900'>Sign Up</p>
                    </Link> */}
                </>
            </div>
        </nav>
    </div>
  )
}

export default Navbar