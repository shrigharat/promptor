'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const router = useRouter();
  const {data: session} = useSession();
  
  const [copied, setCopied] = useState(false);
  
  const pathName = usePathname();

  const handleProfileClick = () => {
    if(prompt.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${prompt.creator._id}`);
  }

  const handleCopyClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied(false);
    }, 3000)
  }

  useEffect(() => {
    
  }, [])

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        {/* user profile info */}
        <div 
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image 
            src={prompt.creator.image}
            alt={`${prompt.creator.name} 's profile picture`}
            width={30}
            height={30}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopyClick}>
          <Image 
            src={copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt={copied ? 'tick_icon' : 'copy_icon'}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">
        {prompt.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
        {prompt.tag}
      </p>

      {/* actions to show if current user is the creator of this prompt */}
      {
        session?.user.id === prompt.creator._id && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
            <p 
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={() => handleEdit && handleEdit(prompt)}
            >
              Edit
            </p>
            <p 
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={() => handleDelete && handleDelete(prompt)}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard