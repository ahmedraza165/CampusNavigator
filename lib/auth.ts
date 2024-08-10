import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {db} from "@/lib/db";
import {compare} from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter";


// @ts-ignore
export const authOptions: NextAuthOptions = {

    // adapter: PrismaAdapter(prisma),
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", placeholder: "Enter Email"},
                password: {label: "Password", placeholder: "Password"}
            },
            async authorize(credentials): Promise<any | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const existingUser = await db.user.findUnique({
                    where: {email: credentials?.email}
                })

                if (!existingUser) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password)

                if (!passwordMatch) {
                    return null;
                }
                if (!existingUser.emailVerified) {
                    // Return null to indicate that login is not allowed until email is verified
                    return null;
                }
                return {
                    id: `${existingUser.id}`,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    stripeCustomerId: existingUser.stripeCustomerId,
                    isActive: existingUser.isActive,
                    trial_end: existingUser.trial_end,
                    subscriptionId: existingUser.subscriptionId
                    // dob: existingUser.dob
                }
            }
        })

    ],
    callbacks: {

        async jwt({token,trigger, user}:any) {

            if (user) {
                const info = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    stripeCustomerId: user.stripeCustomerId,
                    isActive: user.isActive,
                    trial_end: user.trial_end,
                    subscriptionId: user.subscriptionId
                }

                const updatedUserData = await db.user.findUnique({where: {id: user.id}})
                if (updatedUserData) {
                    info.isActive= updatedUserData.isActive
                    info.trial_end = updatedUserData.trial_end
                    info.subscriptionId = updatedUserData.subscriptionId
                    return {
                        ...token,
                        ...info
                    };
                }
                return {
                    ...token,
                    ...info

                }
            }
            return token
        },

        async session({session, token}) {
            const info =  {
                ...session.user,
                id: token.id,
                email: token.email,
                firstName: token.firstName,
                lastName: token.lastName,
                stripeCustomerId: token.stripeCustomerId,
                isActive: token.isActive,
                trial_end: token.trial_end,
                subscriptionId: token.subscriptionId

            }

            const updatedUserData:any = await db.user.findUnique({where: {id: info.id}})
            // @ts-ignore
            info.isActive = updatedUserData.isActive
            info.trial_end = updatedUserData.trial_end
            info.subscriptionId = updatedUserData.subscriptionId

                return {
                    ...session,
                    user: info

            }


        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    events: {
        async updateUser(message) {
            console.log({message})
        },

    }

}
