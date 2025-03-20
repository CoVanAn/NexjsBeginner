"use client"
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { Eye, EyeOff } from "lucide-react"; // Import icon từ lucide-react
import { toast } from "sonner"
import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { handleErrorAPI } from '@/lib/utils';
// import { sessionToken } from '@/lib/http';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const router = useRouter();
    // Trạng thái hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    async function onSubmit(values: z.infer<typeof LoginBody>) {
        setLoading(true);
        try {
            const result = await authApiRequest.login(values);
            // console.log(result);
            toast("Thành công", {
                description: "Đăng nhập thành công",
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
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='width-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit">Đăng nhập</Button>
                    {/* <Button
                        variant="outline"
                        onClick={() =>
                            toast("Event has been created", {
                                description: "Sunday, December 03, 2023 at 9:00 AM",
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    >
                        Show Toast
                    </Button> */}
                </form>
            </Form>
        </div>
    );
}

export default LoginForm;
