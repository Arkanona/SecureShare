const API_URL = import.meta.env.VITE_API_URL

export const updateUserImage = async (userId, file, description, token) => {
  if (!userId) {
    throw new Error("userId manquant")
  }

  const formData = new FormData()

  formData.append("image", file)
  formData.append("description", description)

  const response = await fetch(
    `${API_URL}/api/v1/user/${userId}/image`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`)
  }

  return await response.json()
}


export const displayImage = async (token) => {
  if (!token) {
    throw new Error("Token manquant")
  }

  const response = await fetch(
    `${API_URL}/api/v1/user/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.error("ERREUR BACKEND :", data)

    throw new Error(
      data.message || `Erreur HTTP ${response.status}`
    )
  }

  return data
}