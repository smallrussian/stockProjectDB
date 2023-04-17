import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";



export default function  SignIn  ()  {
    const supabaseClient = useSupabaseClient();
    return(
        <div>
            <Auth supabaseClient={supabaseClient}
                providers={['google', 'github', 'discord']} 
                appearance={{theme: ThemeSupa, variables: {default: {colors: {brand: '#6e43db', brandAccent: '#5959e0',}}}}}
                socialLayout="vertical"
                theme="dark"/>
        </div>
    )
}

