import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeImage from "../components/home/HomeImage";
import HomeImageUser from "../components/home/HomeImageUser";


function Home() {
    return (
        <>
        <title>Accueil - SecureShare</title>
        <meta name="description" content="Découvrez SecureShare, un réseau social minimaliste permettant aux utilisateurs de publier des visuels accompagnés de légendes" />
        <Navbar />
        <HomeImage/>
        <HomeImageUser/>
        <Footer/>
        </>
    )
}

export default Home