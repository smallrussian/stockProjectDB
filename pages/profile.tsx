import {useState, useEffect} from 'react';
import { useUser as useSupaUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
const ProfilePage = () => {
    const supabase = useSupabaseClient();
    const user = useSupaUser();
    const router = useRouter();

    if (!user) {
        router.push('/');
    }
    

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-white font-bold mb-8">Your Profile</h1>
        <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

