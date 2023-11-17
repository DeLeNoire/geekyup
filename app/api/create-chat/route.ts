import { NextResponse } from "next/server"
export async function POSt(req: Request , res : Response){
    try {
       const body = await req.json()
       const {fileKey , fileName} = body
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        )
    }
}