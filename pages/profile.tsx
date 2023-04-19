import { useUser as useSupaUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/auth-helpers-nextjs';
type Props = {
  user: User;
};

const ProfilePage = ({user}: Props) => {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const handlePortfolioReset = async () => {
        const { data, error } = await supabase
            .from('portfolios')
            .update({portfolio:{}, cash_balance: 10000, total_value: 10000})
            .eq('user_id', user.id);
        router.push('/app')
        if (error) {
            console.error(error);
        }
    };


    
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-white font-bold mb-8">Your Profile</h1>
        <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        onClick={handlePortfolioReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: {session}
  } = await supabase.auth.getSession()
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
    },
  };
  }
  return {
    props: {
      user: session.user
    }
  }
}