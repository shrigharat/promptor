'use client';

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const UserProfile = ({params}) => {

    const [profileData, setProfileData] = useState({
        _id: '',
        email: '',
        image: '',
        username: '',
        prompts: []
    })

    const fetchUserProfile = async () => {
        try{
            const response = await fetch(`/api/user/${params.id}/profile`);
            const data = await response.json();
            
            setProfileData(data);
        } catch(error) {
            console.error('Could not fetch prompts');
            setProfileData({
                _id: '',
                email: '',
                image: '',
                username: '',
                prompts: []
            });
        }
    }

    useEffect(() => {
        if(params?.id) {
            fetchUserProfile();
        }
    }, [params?.id]);

    return (
        <Profile 
            name={profileData.username}
            data={profileData.prompts}
            desc={`Welcome to ${profileData.username}'s personalized profile page. Explore ${profileData.username}'s exceptional prompts and be inspired by the power of their imagination`}
        />
    )
}

export default UserProfile