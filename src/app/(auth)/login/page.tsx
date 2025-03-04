import Link from 'next/link';
import LoginForm from './login-form';

const LoginPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-md w-full">
                <LoginForm />
            </div>
            <hr className="w-1/2 my-4" />
            <div className="text-center">
                Nếu bạn chưa có tài khoản, vào {" "}
                <Link href="/register" className="text-blue-500">Đăng ký</Link>
            </div>
        </div>
    );
}

export default LoginPage;
