"use client"

import Link from 'next/link';

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            {/* <button onClick={() => console.log("Login")}>Login Page</button> */}
            <Link href="/register">Click to Register</Link>
        </div>
    );
}

export default LoginPage;