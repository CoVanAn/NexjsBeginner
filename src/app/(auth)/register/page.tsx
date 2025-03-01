"use client"
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register Page</h1>
            {/* <button>ABC</button> */}
            <Link href="/login">Click to Login</Link>
        </div>
    );
}

export default RegisterPage;