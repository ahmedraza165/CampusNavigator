import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        email: String
        firstName: String
        lastName: String
        dob: String

    }

    interface Session {
        user: user & {
            email: String
            firstName: String
            lastName: String
            dob: String
        },
        token: {
            email: String
            firstName: String
            lastName: String
            dob: String
        }
    }
}