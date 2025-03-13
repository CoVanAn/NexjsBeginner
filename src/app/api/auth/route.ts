// import { cookies } from "next/headers"

export async function POST(req: Request) {
    const res = await req.json()
    const sessionToken = res.payload?.data?.token
    console.log(res)
    if (!sessionToken) {
        return Response.json({ message: 'Không nhận được sessionToken' }, {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return Response.json(res.payload, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `sessionToken=${sessionToken}; Path=/`
        }
    })
}