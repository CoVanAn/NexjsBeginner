import z from 'zod';

const configSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string(),
});

const configProject = configSchema.safeParse(process.env);

if(!configProject.success) {
    console.error(configProject.error.issues);
    throw new Error('Các giá trị khau báo trong file .env không hợp lệ');
}

const envConfig = configProject.data;

export default envConfig;