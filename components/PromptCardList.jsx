import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick, handleEdit, handleDelete}) => {

    return (
      <div className="mt-16 prompt_layout">
        {
          data.map((prompt) => (
            <PromptCard 
              key={prompt._id}
              prompt={prompt}
              handleTagClick={handleTagClick}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    )
}

export default PromptCardList;