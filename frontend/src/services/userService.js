const API_URL = import.meta.env.VITE_API_URL

export const updateUserImage = async (userId, file) => {
    const formData = new FormData()

    formData.append('image', file)

    const response = await fetch(`${API_URL}/api/user/${userId}/image`,
        {
            method: 'PATCH',
            body: formData
        }
    )

    const data = await response.json()

    return data
}