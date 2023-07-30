'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {
  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
   const setProvidersEffect = async () => {
    const response = await getProviders();
    setProviders(response);
   }

   setProvidersEffect();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={'/'}>
        <Image 
          src='/assets/images/logo.svg'
          alt='Promptor Logo'
          className='object-contain'
          width={32}
          height={32}
        />
        <p className='logo_text'>Promptor</p>
      </Link>

      {/* Desktop navigation */}
      <div className='sm:flex hidden'>
        {
          session?.user ? 
          <div className='flex gap-3 md:gap-5'>
            <Link 
              href='/prompts/create'
              className='black_btn'
            >
              Create prompt
            </Link>
            <button 
              type="button" 
              className='outline_btn' 
              onClick={signOut} 
            >
              Sign Out
            </button>
            <Link href='/profile'>
              <Image 
                className='profile rounded-full'
                width={32}
                height={32}
                src={session?.user.image}
                alt='profile link'
              />
            </Link>
          </div> 
          : 
          <>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                  type='button'
                  className='black_btn'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>)
              )
            }
          </>
        }
      </div>

      {/* Mobile navigation */}
      <div className='sm:hidden flex relative'>
        {
          session?.user ? 
          (<div className='flex'>
            <Image 
                className='rounded-full'
                width={32}
                height={32}
                src={session?.user.image}
                alt='profile link'
                onClick={() => setDropdownOpen((prev) => !prev)}
              />

              {
                dropdownOpen && (
                  <div className='dropdown'>
                    <Link 
                      href='/profile'
                      className='profile_link'
                      onClick={() => setDropdownOpen(false)}
                    >
                      My profile
                    </Link>
                    <Link 
                      href='/prompts/create'
                      className='profile_link'
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create prompt
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut()
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign out
                    </button>
                  </div>
                )
              }
          </div>) 
          : 
          (<>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                  type='button'
                  className='black_btn'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>)
              )
            }
          </>)
        }
      </div>
    </nav>
  )
}

export default Nav