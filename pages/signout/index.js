import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Page() {
    const router = useRouter();
    const auth = getAuth();
    const [count, setCount] = useState(3);

    signOut(auth).then(() => {

        // countdown until we redirect the user
        const interval = setInterval(function() {
            setCount(count - 1)
        }, 1000);
        
        // redirect the user after 3 seconds
        setTimeout(() => {
            clearInterval(interval);
            router.push("/")
        }, 3000);

    })

    return (
        <h1>Youve been signed out! Youll be redirected in { count }</h1>
    );
}

export default Page;