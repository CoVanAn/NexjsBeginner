"use client"
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';

import { Eye, EyeOff } from "lucide-react"; // Import icon từ lucide-react
import authApiRequest from '@/apiRequests/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { handleErrorAPI } from '@/lib/utils';
// import { sessionToken } from '@/lib/http';

const RegisterForm = () => {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    })

    const router = useRouter();
    // Trạng thái hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    async function onSubmit(values: z.infer<typeof RegisterBody>) {
        try {
            const result = await authApiRequest.register(values);
            // console.log(result);
            toast("Thành công", {
                description: "Đăng kí thành công",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
            await authApiRequest.auth({ sessionToken: result.payload.data.token });
            router.push("/me");
        }
        catch (error: any) {
            handleErrorAPI({ error, setError: form.setError });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input placeholder="Co Van An" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="covanan632003@gmail.com" {...field} type="email" formNoValidate />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={showPassword ? "text" : "password"} />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Confirm Password Field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} type={showConfirmPassword ? "text" : "password"} />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        onClick={toggleConfirmPassword}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <div className="w-full  flex items-center justify-center"> */}
                <Button className="w-full bg-sky-400 h-12 text-lg font-bold" type="submit">
                    Đăng ký
                </Button>
                {/* </div> */}
            </form>
        </Form>
    );
}

export default RegisterForm;
function setSessionToken(token: string) {
    throw new Error('Function not implemented.');
}

