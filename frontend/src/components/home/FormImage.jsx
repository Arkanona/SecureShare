import { useState } from 'react'
import { updateUserImage } from '../../services/userService'

function FormImage(userId){

    const [description, setDescription] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const file = e.target.image.file[0]

        if(!file){
            return 'file empty'
        }

        try { 
            const data = await updateUserImage(userId, file, description) 
            console.log(data) 
        } catch (error) { 
            console.error(error) 
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="file" name="image" accept="image/*" />
            <button type="submit"> Envoyer </button>
        </form>
    )
}
export default FormImage