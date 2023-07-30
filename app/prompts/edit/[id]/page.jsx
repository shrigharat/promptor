'use client';

import Form from "@components/Form";
import { useEffect, useState } from "react";

const EditPrompt = ({params}) => {
    const [promptObj, setPromptObj] = useState({
        prompt: '',
        tag: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!params.id) return;

        try {
            await fetch(`/api/prompt/${params.id}`, {
                body: JSON.stringify(promptObj),
                method: 'PATCH'
            });
        } catch (error) {
            console.error('Could not update prompt');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${params.id}`);
            const data = await response.json();
            setPromptObj(data);
        }

        if(params.id) {
            fetchPrompt();
        }
    }, [params.id]);

    return (
        <Form 
            type="Edit"
            post={promptObj}
            setPost={setPromptObj}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt