'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const flashMessage = (message) => {
        const flash = document.getElementById("flash");
        flash.innerText = message;
        flash.className = "bg-red-500 text-white mt-2 mb-2 pr-1 pl-1";
    }

    const hideFlash = () => {
        const flash = document.getElementById("flash");
        flash.innerText = "";
        flash.className = "hidden";
    }

    const handleForm = async (event) => {
        event.preventDefault()

        hideFlash()

        const { result, error } = await signIn(email, password);

        if (error) {
            flashMessage(error.message)
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (<div className="wrapper flex items-center justify-center h-screen from-green-300 to-teal-500 bg-gradient-to-r">
        <div className="form-wrapper w-96 shadow-md rounded-lg bg-white p-5">
            <h1 className="w-full font-bold text-3xl mb-2">Sign In</h1>
            <hr />
            <p id="flash" className="hidden"></p>
            <form onSubmit={handleForm} className="form mt-2">
                <label htmlFor="email">
                    <p>Email</p>
                    <input className="w-full border-[1px] mb-2" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input className="w-full border-[1px] mb-2" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button className="p-2 shadow-md rounded-lg w-full hover:bg-slate-100 mb-2 mt-2" type="submit">Sign In</button>
                <Link className="text-sm text-center" href={"/signup"}>Dont have an account? Sign Up!</Link>
            </form>
        </div>
    </div>);
}

export default Page;