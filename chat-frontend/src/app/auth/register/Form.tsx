
"use client"
import Spinner from "@/components/Spinner"

import Link from 'next/link';
import { useRegister } from '@/hooks';
const RegisterForm = ({ ...props }) => {
    const {
        email,
        username,
        password,
        isloading,
        onChange,
        onSubmit,
    } = useRegister();
    return (
        <>
            <div {...props}>
                <div className="flex flex-col self-stretch gap-2.5">
                    <h1 className="!text-black-900_01 tracking-[-2.00px] !font-poppins text-center">
                        Create Free Account
                    </h1>
                    <p
                        className=" md:w-full !text-blue_gray-700_01 !font-poppins text-center leading-[30px]"
                    >
                        Clarity gives you the blocks and components you need to create a truly professional website.
                    </p>
                </div>
                <form onSubmit={onSubmit}>
                    <div className=" size-3xl flex flex-col self-stretch items-center justify-center gap-[23px] p-[25px] sm:p-5 bg-white-A700 shadow-xs rounded-[20px]">

    
                        <input

                            type="email"
                            name="email"
                            placeholder={`Email Address`}
                            value={email}
                            onChange={onChange}
                            className="size-3xl self-stretch sm:px-5 !text-blue_gray-700_01 font-poppins border-gray-300_02 border border-solid rounded-[9px]"
                        />
                        <input

                            type="text"
                            name="username"
                            placeholder={`Create Username`}
                            value={username}
                            onChange={onChange}
                            className="text-4xl self-stretch sm:px-5 text-blue_gray-700_01 font-poppins border-gray-300_02 border border-solid rounded-[9px]"
                        />
        
                        <input

                            type="password"
                            name="password"
                            placeholder={`Create Password`}
                            value={password}
                            onChange={onChange}
                            className="text-4xl self-stretch sm:px-5 text-blue_gray-700_01 font-poppins border-gray-300_02 border border-solid rounded-[9px]"
                        />
        
                        <input
                            type='checkbox'
                            name="shape"
                            id="shape"
                            className="self-start ml-[5px] gap-[9px] p-px md:ml-0 text-black-900_01 font-poppins text-left text-sm"
                        />
                        <button
                            type='submit'
                            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                            {`Sign Up`}
                        </button>
                        <p className="mb-[3px] !text-gray-600 !font-poppins text-center">
                            <span className="text-gray-600">Already have an account?&nbsp;</span>
                            <Link href="/auth/login"><span className="text-blue-A700 font-semibold">Sign in</span></Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
