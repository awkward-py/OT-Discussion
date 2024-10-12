// components/shared/navbar/Navbar.tsx
"use client"; // This indicates that this is a Client Component


import { getUserInfo } from '@/lib/actions/user.action'; // Ensure this path is correct
import { SignedIn, useAuth, UserButton } from '@clerk/nextjs'; // Use useAuth hook to access auth details
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Theme from './Theme';
import MobileNav from './MobileNav';
import GlobalSearch from '../search/GlobalSearch';

// Define a type for user stats
interface UserStats {
  user: any; // Replace `any` with the actual type if available
  totalQuestions: number;
  totalAnswers: number;
  reputation: number; // Ensure that reputation is included
}

const Navbar = () => {
  // Initialize userStats with a type
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  
  const { userId } = useAuth(); // Get the user ID from Clerk

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        if (userId) {
          const userInfo = await getUserInfo({ userId }); // Adjust based on your function's implementation
          setUserStats(userInfo); // userInfo should match UserStats type
        }
      } catch (error) {
        console.error('Failed to fetch user stats', error);
      }
    };

    fetchUserStats();
  }, [userId]); // Add userId as a dependency to fetch when it changes

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="https://raw.githubusercontent.com/awkward-py/Open-Source-Off-Topics/main/assets/images/logoo.png"
          width={28}
          height={28}
          alt="OT Discussion"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          OT <span className="text-indigo-700">Discussion</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5 items-center">
        {userStats && (
        <div className="flex flex-col items-center">
        <span
          className="text-sm font-bold bg-clip-text text-transparent flex items-center"
          style={{ backgroundImage: 'linear-gradient(184deg, #f369b0 40%, #9D00FF 80%)' }}
        >
          {/* New SVG Icon */}
          <svg
        
            viewBox="0 2 64 64"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="iconify iconify--emojione inline-block mr-1 text-yellow-500" // Maintain inline display and margin
            preserveAspectRatio="xMidYMid meet"
            fill="#000000"
            height="24px" // Set height to desired size
            width="24px" // Set width to desired size
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier">
              <path d="M57 26.2s-3 2.8-8.1 6.1C47.5 24.2 43.6 14.2 36 2c0 0-2.5 13.1-10.8 25.4c-3.6-5.6-5.2-10-5.2-10C-6 43.5 15.6 62 29.2 62c17.4 0 32.7-8.4 27.8-35.8" fill="#3341ff"></path>
              <path d="M46.7 49.4c1.5-3.3 2.6-7.6 2.8-13c0 0-2.1 1.8-5.7 4.1c-1-5.4-3.7-12-9-20.2c0 0-1.7 8.7-7.5 17c-2.5-3.7-3.6-6.7-3.6-6.7c-4.3 6.8-6 12.2-6.1 16.5c-2.4-.9-3.9-1.6-3.9-1.6c4.1 12.2 12.6 14.9 16.4 14.9c6.8 0 13.7-2 20.5-11.7c0-.1-1.5.3-3.9.7" fill="#7edff7"></path>
              <path d="M21.9 43.9s2.8 3.8 4.9 2.9c0 0 4-6.3 9.8-9.8c0 0-1.2 9.6.2 11.3c1.8 2.3 6.7-2.5 6.7-2.5c0 5.7-6.2 12.8-11.8 12.8c-5.4 0-13.2-6.2-9.8-14.7" fill="#d11acb"></path>
              <g fill="#3341ff">
                <path d="M49.8 18.1c2.1-3 3.5-6.2 3.5-6.2c3.5 5.8 1.4 9.3-.1 10.4c-2.1 1.6-5.8-.7-3.4-4.2"></path>
                <path d="M11.6 17.1c-2.1-3.5-2.3-7.9-2.3-7.9c-5 7.5-3.1 11.7-1.4 12.9c2.2 1.7 6-.9 3.7-5"></path>
                <path d="M23.2 9.3c.3-2.4-.7-4.8-.7-4.8c4.7 3.1 4.7 5.7 4.1 6.8c-.9 1.3-3.7.7-3.4-2"></path>
              </g>
            </g>
          </svg>
          {/* Display only the score on small screens */}
          <span className="block md:hidden">{userStats.reputation}</span>
          {/* Display the full text on larger screens */}
          <span className="hidden md:block">{userStats.reputation} Snapshots</span>
        </span>
      </div>
      
       
        )}

        <Theme />

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: 'blue',
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar;
