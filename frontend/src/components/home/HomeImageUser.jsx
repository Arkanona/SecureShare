import { useEffect, useState } from "react"
import { displayImage } from "../../services/userService"
import useAuthStore from "../../store/authStore"

const API_URL = import.meta.env.VITE_API_URL

function HomeImageUser() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)

  useEffect(() => {
    const getImages = async () => {
      if (!user || !token) {
        setLoading(false)
        return
      }

      try {
        const data = await displayImage(token)

        setImages(data|| [])
      } catch (error) {
        console.error(error)
        setError("Impossible de récupérer les images")
      } finally {
        setLoading(false)
      }
    }

    getImages()
  }, [user, token])

  if (loading) {
    return <p>Chargement des images...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section>
      <div>
        <h2>Toutes les photos</h2>
        <p>{images.length}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.length > 0 ? (
          images.map((image, index) => (
            <article
              key={`${image.url}-${index}`}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <img
                src={`${API_URL}${image.url}`}
                alt={image.description || "Photo utilisateur"}
                className="h-[250px] w-full object-cover"
              />

              {image.description && (
                <p className="p-3">
                  {image.description}
                </p>
              )}
            </article>
          ))
        ) : (
          <p>Aucune photo pour le moment.</p>
        )}
      </div>
    </section>
  )
}

export default HomeImageUser