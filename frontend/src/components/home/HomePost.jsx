import { useState } from "react"
import { updateUserImage } from "../../services/userService"
import useAuthStore from "../../store/authStore"
import { useNavigate } from "react-router-dom"

function HomePost() {
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")

    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
        navigate("/login")
        console.error("Aucun utilisateur connecté")
        return
    }
    
    if (!image) {
        return
    }

    try {
      await updateUserImage(
        user.id,
        image,
        description,
        token
      )

      setImage(null)
      setDescription("")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="grid gap-[15px] p-[15px] justify-self-center" onSubmit={handleSubmit}>
      <input className="bg-black text-white w-fit rounded-[5px] p-[5px]"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Aperçu"
          className="mt-4 h-40 w-40 rounded-lg object-cover"
        />
      )}

      <textarea className="bg-white text-black w-fit rounded-[5px] p-[5px] border-solid border-black"
        placeholder="Ajouter une description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-black text-white w-fit rounded-[5px] p-[5px]" type="submit">
        Envoyer l'image
      </button>
    </form>
  )
}

export default HomePost
