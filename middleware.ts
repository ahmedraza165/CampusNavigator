
export { default } from "next-auth/middleware"

export const config = {
    matcher: ['/about/:path*', '/dashboard/:path*', '/dashboard', '/organizations', '/organization/:path*', '/result', '/settings'],
}