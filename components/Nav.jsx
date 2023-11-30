'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* {alert(session?.user)} */}
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn capitalize">
              create post
            </Link>

            <button
              type="button"
              className="outline_btn capitalize"
              onClick={signOut}
            >
              sign out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn capitalize"
                >
                  sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="sm:hidden flex flex-col">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="profile"
              width={30}
              height={30}
              className="object-contain"
              onClick={() => settoggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link capitalize"
                  onClick={() => settoggleDropDown(false)}
                >
                  my profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link capitalize"
                  onClick={() => settoggleDropDown(false)}
                >
                  create prompt
                </Link>
                <button
                  type="button"
                  className="black_btn capitalize w-full mt-5"
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                >
                  sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn capitalize"
                >
                  sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
