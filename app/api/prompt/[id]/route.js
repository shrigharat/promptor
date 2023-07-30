import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, {params}) => {
    try{
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) {
            return new Response(`Could not find prompt with ID - ${params.id}`, {status: 400});
        }

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch(err) {
        console.error("Error occurred while fetching all prompts");
        return new Response(`Could not get prompt with ID - ${params.id}`, {status: 500});
    }
}

export const PATCH = async (req, {params}) => {
    try{
        const {prompt, tag} = await req.json();
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id).populate('creator');
        if(!existingPrompt) {
            return new Response(`Could not find prompt with ID - ${params.id}`, {status: 400});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the prompt!", {status: 200});
    } catch(err) {
        console.error("Error occurred while fetching all prompts");
        return new Response(`Could not get prompt with ID - ${params.id}`, {status: 500});
    }
}

export const DELETE = async (req, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);
        return new Response("Successfully deleted the prompt!", {status: 200});
    } catch(err) {
        console.error("Error occurred while fetching all posts");
        return new Response(`Could not delete prompt with ID - ${params.id}`, {status: 500});
    }
}