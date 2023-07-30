import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const user = await User.findOne({ email: session.user.email });
            session.user.id = user._id.toString();
    
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
    
                //check if user exists
                const existingUser = await User.findOne({
                    email: profile.email
                });
    
                //if user doesnt exist, create user
                if(!existingUser) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replaceAll(" ", ''),
                        image: profile.picture
                    })
                }
    
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
})

export {handler as GET, handler as POST};