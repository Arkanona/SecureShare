const API_URL = import.meta.env.VITE_API_URL

export const updateUserImage = async (userId, file, description) => {
  if (!userId) {
    throw new Error("userId manquant")
  }

  const formData = new FormData()

  formData.append("image", file)
  formData.append("description", description)

  const response = await fetch(
    `${API_URL}/api/user/${userId}/image`,
    {
      method: "PATCH",
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`)
  }

  return await response.json()
}