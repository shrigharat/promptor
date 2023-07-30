"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {
    const {data: session} = useSession();
    const router = useRouter();

    const [myPrompts, setMyPrompts] = useState([]);

    const fetchMyPrompts = async () => {
        const response = await fetch(`/api/user/${session.user.id}/prompts`);
        const data = await response.json();
        setMyPrompts(data);
    }

    useEffect(() => {
        if(session?.user.id) {
            fetchMyPrompts();
        }
    }, [session?.user.id])

    const handleEdit = (prompt) => {
        router.push(`/prompts/edit/${prompt._id}`);
    }

    const handleDelete = async (prompt) => {
        let hasConfirmed = confirm("Are you sure you want to delete this prompt ?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${prompt._id.toString()}`, {
                    method: 'DELETE'
                });
                const remainingPrompts = myPrompts.filter(
                    currentPrompt => prompt._id !== currentPrompt._id
                );
                setMyPrompts(remainingPrompts);
            } catch(error) {
                console.log("Error occurred while deleting prompt with id: ", prompt._id);
                console.error(error);
            }
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
            data={myPrompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;