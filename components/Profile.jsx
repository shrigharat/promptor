import PromptCardList from './PromptCardList'

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'> {name} {name !== 'My' && '\'s' } Profile </span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      {
        data?.length ? (
          <PromptCardList 
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ) : (
          <p className='desc mt-10'>{name} has not posted any prompts yet.</p>
        )
      }
    </section>
  )
}

export default Profile