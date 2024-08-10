import { NextResponse } from 'next/server';
 
type ResponseData = {
  message: string
}
 
// Handles GET requests to /api
export async function GET(request: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}