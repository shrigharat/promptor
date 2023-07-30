import Profile from "@components/Profile";
import Head from "next/head";

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
        <>
            <Head>
                <title>{profileData.username}'s Profile</title>
                <meta property="og:title" content={`${profileData.username}'s Profile`}></meta>
                <meta name="twitter:card" content={`${profileData.username}'s Profile`} />
                <meta name="twitter:title" content={`${profileData.username}'s Profile`} />
                
                <meta property="og:image" content="/assets/images/default-cover-image.jpg" />
                <meta name="twitter:image" content="/assets/images/default-cover-image.jpg" />

                <meta name="description" content={`Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`}></meta>
                <meta property="og:description" content={`Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`}></meta>
                <meta name="twitter:description" content={`Check out ${profileData.username}'s profile aon Promptor and explore their prompts.`} />

                <meta property="og:type" content="website" />
                <meta name="robots" content="index, nofollow"></meta>
            </Head>
            <Profile 
                name={profileData.username}
                data={profileData.prompts}
                desc={`Welcome to ${profileData.username}'s personalized profile page. Explore ${profileData.username}'s exceptional prompts and be inspired by the power of their imagination`}
            />
        </>
    )
}

export default UserProfile