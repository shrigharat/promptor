import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    if(!params.id) return new Response('Incorrect request!', 400);

    try{
        await connectToDB();

        const userProfile = await User.findById(params.id);
        
        if(!userProfile) {
            return new Response("User profile not found!", {status: 404});
        }

        const allPosts = await Prompt.find({creator: params.id}).populate('creator');
        const finalResponse = {
            _id: userProfile._id,
            email: userProfile.email,
            username: userProfile.username,
            image: userProfile.image,
            prompts: allPosts
        }

        return new Response(JSON.stringify(finalResponse), {status: 200});
    } catch(err) {
        console.error("Error occurred while fetching user profile");
        console.error(err);
        return new Response("Could not get user profile", {status: 500});
    }

}