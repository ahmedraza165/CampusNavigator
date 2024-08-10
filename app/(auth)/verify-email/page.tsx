"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import {PropagateLoader} from "react-spinners";


export default function Page() {
    const router = useRouter();
    const [verificationCounter, setVerificationCounter] = useState(0); // State to track verification attempts

    useEffect(() => {
        async function verifyEmail() {
            const searchParams = new URLSearchParams(window.location.search); // Extract search params
            const token = searchParams.get('token'); // Get the token from search params
            console.log(token);
            if (token && verificationCounter === 0) { // Check if email is not already verified and the counter is 0
                try {
                    // Send a request to your backend to verify the email using Axios
                    const response = await axios.post(`/api/auth/verify-email`, { token });
                    console.log(response)
                    if (response.status === 200) {
                        setVerificationCounter(verificationCounter + 1);
                        router.push('/sign-in'); // Redirect to sign-in page
                    }
                } catch (error) {
                    console.error('Error verifying email:', error);
                }
            }
        }
        verifyEmail();
    }, []); 

    return (
        <div className={'flex items-center justify-center pt-56'}>
        <PropagateLoader/>
        </div>
    );
}
