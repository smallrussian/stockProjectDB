import React, { useState } from "react";
import LoginModal from "@/components/LoginModal";
import { GetServerSidePropsContext } from "next/types";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "@/utils/helpers";
import Link from "next/link";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="text-center text-white space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">Stock Trading Webapp</h1>
        <p className="text-xl md:text-2xl">A webapp for trading stocks</p>
        <div className="space-x-4">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-200"
          >
            Sign In
          </button>
          <button
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-200"
            type="button"
          >
            <Link href="/app">Go to App</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (session) {
    return {
      redirect: {
        destination: `${getURL()}/app`,
        permanent: false
      }
    };
  }
  return {
    props: {}
  };
};
