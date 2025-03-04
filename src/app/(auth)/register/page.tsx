import Link from 'next/link';
import RegisterForm from './register-form';

const RegisterPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="max-w-md w-full">
                <RegisterForm />
            </div>
            <hr className="w-1/2 my-4" />
            <div className="text-center">
                Nếu bạn đã có tài khoản, vào {" "}
                <Link href="/login" className="text-blue-500">Đăng nhập</Link>
            </div>
        </div>
    );
}

export default RegisterPage;
