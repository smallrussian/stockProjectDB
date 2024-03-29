import { Database } from "@/types/supabase";
import { getURL } from "@/utils/helpers";
import { Dialog, Transition } from "@headlessui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Label } from "flowbite-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const LoginModal = ({ isOpen, setIsOpen }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const checkUsernameExists = async () => {
    const supabase = createBrowserSupabaseClient<Database>();
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();
    if (error) {
      console.error(error);
    }
    return !!data;
  };

  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const router = useRouter();

  const handleNewUserClick = () => {
    setIsSignIn(!isSignIn);
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = async () => {
    const supabase = createBrowserSupabaseClient<Database>();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "/app",
        data: {
          username
        }
      }
    });
    if (error) {
      console.error(error);
    }
  };
  // auth state change
  const handleSignIn = async () => {
    const supabase = createBrowserSupabaseClient<Database>();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    // handle auth state change
    await supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        console.log("signed in");
        router.push("/app");
      }
    });
    if (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const signInWithGithub = async () => {
    const supabase = createBrowserSupabaseClient<Database>();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${getURL()}/app`
      }
    });
    if (error) {
      console.error(error);
    }
  };
  const signInWithDiscord = async () => {
    const supabase = createBrowserSupabaseClient<Database>();
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${getURL()}/app}`
      }
    });
  };

  if (isSignIn) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden  align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={signInWithGithub}
                    className="flex w-full px-4 py-2 mt-3 text-sm font-medium text-black border-solid border-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-gray-100"
                  >
                    <Image
                      className="items-center"
                      src="/github-icon.svg"
                      alt="Github"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1 justify-center text-center">
                      <span>Continue with Github</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={signInWithDiscord}
                    className="flex w-full px-4 py-2 mt-3 text-sm font-medium text-black border-solid border-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-gray-100"
                  >
                    <Image
                      className="items-center"
                      src="/discord-icon.svg"
                      alt="Discord"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1 justify-center text-center">
                      <span>Continue with Discord</span>
                    </div>
                  </button>
                </div>
                {/* // the word or surrounded by two thin lines */}
                <div className="mt-2 flex flex-row justify-center">
                  <span className="w-2/5 border-t border-gray-300 h-fit mt-3 mx-2" />
                  <p className="text-sm text-gray-500 text-center">Or</p>
                  <span className="w-2/5 border-t border-gray-300 h-fit mt-3 mx-2" />
                </div>
                <div className="mt-4">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                {/* //forget password */}
                <div className="mt-2">
                  <a
                    href="/app"
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
                  >
                    Log in
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center">
                    New here?{" "}
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={handleNewUserClick}
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
  if (isSignUp) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden  align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={signInWithGithub}
                    className="flex w-full px-4 py-2 mt-3 text-sm font-medium text-black border-solid border-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-gray-100"
                  >
                    <Image
                      className="items-center"
                      src="/github-icon.svg"
                      alt="Github"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1 justify-center text-center">
                      <span>Continue with Github</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={signInWithDiscord}
                    className="flex w-full px-4 py-2 mt-3 text-sm font-medium text-black border-solid border-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:bg-gray-100"
                  >
                    <Image
                      className="items-center"
                      src="/discord-icon.svg"
                      alt="Discord"
                      width={20}
                      height={20}
                    />
                    <div className="flex-1 justify-center text-center">
                      <span>Continue with Discord</span>
                    </div>
                  </button>
                </div>
                {/* // the word or surrounded by two thin lines */}
                <div className="mt-2 flex flex-row justify-center">
                  <span className="w-2/5 border-t border-gray-300 h-fit mt-3 mx-2" />
                  <p className="text-sm text-gray-500 text-center">Or</p>
                  <span className="w-2/5 border-t border-gray-300 h-fit mt-3 mx-2" />
                </div>
                <div className="mt-4">
                  <Label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </Label>
                  <input
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    value={username}
                    className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                    onChange={(e) => setUsername(e.target.value)}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onBlur={async (e) => {
                      const usernameExists = await checkUsernameExists();
                      if (usernameExists) {
                        setUsernameError("Username already taken");
                        setSubmitButtonDisabled(true);
                      } else {
                        setUsernameError("");
                        setSubmitButtonDisabled(false);
                      }
                    }}
                  />
                </div>
                {/* hi */}
                <div className="mt-4">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <input
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* another push for vercefa-li */}
                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      value={password}
                      type="password"
                      placeholder="Enter password"
                      className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </label>
                </div>
                {/* //confirm password */}
                <div className="mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                    <input
                      onChange={(e) => setConfirmedPassword(e.target.value)}
                      value={confirmedPassword}
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </label>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleSignUp}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
                    disabled={
                      submitButtonDisabled || password !== confirmedPassword
                    }
                  >
                    Sign Up
                  </button>
                </div>
                {/* //new here sign in Link */}
                <div className="mt-4">
                  <p className="text-sm text-gray-500 text-center">
                    Not actually new here?{" "}
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={handleNewUserClick}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};
export default LoginModal;
