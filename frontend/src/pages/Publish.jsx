import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HomePost from "../components/home/HomePost";
import ImageDescription from "../components/home/XssDescUser";
import useAuthStore from "../store/authStore";



function Publish() {

    const { user } = useAuthStore()

    const lastImage = user?.images?.[user.images.length - 1]
    return (
        <>
        <title>Nouvelle publication - SecureShare</title>
         <Navbar />
         <ImageDescription description={lastImage?.description || ''} />
        <HomePost/>
        <Footer/>
        </>
    )
}

export default Publish