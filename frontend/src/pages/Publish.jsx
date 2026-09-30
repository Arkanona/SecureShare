import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HomePost from "../components/home/HomePost"
import ImageDescription from "../components/home/XssDescUser"
import useAuthStore from "../store/authStore"

function Publish() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  const lastImage = user?.images?.[user.images.length - 1]

  return (
    <>
      <title>Nouvelle publication - SecureShare</title>
      <Navbar />
      <ImageDescription description={lastImage?.description || ""}/>
      <HomePost />
      <Footer />
    </>
  )
}

export default Publish