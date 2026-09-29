import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeImage from "../components/home/HomeImage";
import HomePost from "../components/home/HomePost";


function Home() {
    return (
        <>
        <title>Accueil - SecureShare</title>
        <meta name="description" content="Découvrez SecureShare, un réseau social minimaliste permettant aux utilisateurs de publier des visuels accompagnés de légendes" />
        <Navbar />
        <HomeImage/>
        <HomePost/>
        <Footer/>
        </>
    )
}

export default Home