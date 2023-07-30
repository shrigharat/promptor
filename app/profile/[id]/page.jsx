import Profile from "@components/Profile";
import Head from "next/head";

export async function generateMetadata({ params }) {
    let profileData;
    try{
        const response = await fetch(`${process.env.API_URL}/api/user/${params.id}/profile`);
        profileData = await response.json();
    } catch(error) {
        console.error('Could not fetch prompts');
        console.error(error);
        profileData = {
            _id: '',
            email: '',
            image: '',
            username: '',
            prompts: []
        }
    }

    return {
        title: `${profileData.username}'s Profile`,
        description: `Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`,
        image: "/assets/images/default-cover-image.jpg",
        keywords: ['AI', 'Prompts', 'LLM', 'Prompt'],
        openGraph: {
            title: `${profileData.username}'s Profile`,
            description: `Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`,
            images: [
                'https://i.ibb.co/X3kLMX4/default-cover-image.jpg'
            ],
        },
        twitter: {
            card: `${profileData.username}'s Profile`,
            title: `${profileData.username}'s Profile`,
            description: `Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`,
            images: ['https://i.ibb.co/X3kLMX4/default-cover-image.jpg'],
        },
    }
}

const UserProfile = async ({params}) => {
    let profileData;

    try{
        const response = await fetch(`${process.env.API_URL}/api/user/${params.id}/profile`);
        profileData = await response.json();
    } catch(error) {
        console.error('Could not fetch prompts');
        console.error(error);
        profileData = {
            _id: '',
            email: '',
            image: '',
            username: '',
            prompts: []
        }
    }

    return (
        <Profile 
            name={profileData.username}
            data={profileData.prompts}
            desc={`Welcome to ${profileData.username}'s personalized profile page. Explore ${profileData.username}'s exceptional prompts and be inspired by the power of their imagination`}
        />
    )
}

export default UserProfile