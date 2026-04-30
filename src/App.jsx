
import './App.css'
import Banner from './Banner/Banner'
import LatestBlog from './Blog/LatestBlog'
import Categoy from './Category/Categoy'
import Faq from './FAQ/Faq'
import Footer from './Footer/Footer'
import Herosection from './HeroSection/Herosection'
import Navbar from './Navbar/Navbar'
import Services from './Services/Services'

function App() {

  return (
    <>
      <Navbar/>
      <Herosection />
      <Categoy />
      <Services />
      <LatestBlog />
      <Faq/>
      <Banner/>
      <Footer/>






    </>
  )
}

export default App
