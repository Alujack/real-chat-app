"use client"

import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useLogin } from "@/hooks";
export default function Signinfrom({ ...props }) {
    const { email, password, onChange, onSubmit } = useLogin();
     const getData = async () => {
  const token = localStorage.getItem('token');  
  console.log(token)
  const response = await fetch('http://localhost:8000/api/test/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,  // Add the token in the header
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Only needed if you're dealing with cookies
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.error('Failed to fetch data', response.status);
  }
};
    return (
        <div {...props}>
            <div className="flex flex-col self-stretch items-center gap-2.5">
                <h1 className=" text-center">
                    Sign in to your account
                </h1>
                <p
                    className="w-[78%] md:w-full !text-blue_gray-700_01 !font-poppins text-center leading-[30px]"
                >
                    Clarity gives you the blocks and components you need to create a truly professional website.
                </p>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col items-center justify-center w-full gap-[26px] p-[27px] sm:p-5 bg-white-A700 shadow-xs rounded-[20px]">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder={`Email Address`}
                            onChange={onChange}
                            className="text-4xl self-stretch mt-1 sm:px-5 !text-blue_gray-700_01 font-poppins border-gray-300_02 border border-solid rounded-[9px]"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder={`Create Password`}
                            onChange={onChange}
                            className="text-4xl self-stretch sm:px-5 !text-blue_gray-700_01 font-poppins border-gray-300_02 border border-solid rounded-[9px]"
                        />
                        <div className="flex self-stretch justify-between gap-2">
                            <input
                                type="checkbox"
                                name="rememberme"
                                id="rememberme"
                                className="self-start gap-[9px] p-px text-black-900_01 font-poppins text-left text-sm"
                            />
                            <a href="#" className="self-end">
                                <p className="!text-black-900_01 !font-poppins">
                                    Forgot password?
                                </p>
                            </a>
                        </div>
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white-A700 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            Sign In
                        </button>
                        <p className="mb-1 !text-gray-600 !font-poppins text-center">
                            <span className="text-gray-600">Don&#39;t have an account?&nbsp;</span>
                            <Link href="/auth/register"><span className="text-blue-A700 font-semibold">Sign up</span></Link>
                        </p>
                    </div>
                </form>
                <button onClick={getData} className="p-5 bg-blue-700 text-white">Click me</button>
            </div>
        </div>
    );
}
