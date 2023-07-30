import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try{
        await connectToDB();

        const allPosts = await Prompt.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(allPosts), {status: 200});
    } catch(err) {
        console.error("Error occurred while fetching all posts");
        return new Response("Could not get all posts", {status: 400});
    }

}