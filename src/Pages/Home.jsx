import React from 'react'
import Hero from '../Components/Hero'
import FeaturedPrroducts from '../Components/FeaturedProducts'
// import Testimonials from '../Components/Testimonials'
import AboutOurFood from '../Components/AboutOurFood'
import CTA from '../Components/CTA'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Gallery from '../Components/Gallery'
import AboutUs from '../Components/AboutUs'
import DeliveredTo from '../Components/DeliveredTo'
import WhatsappBtn from '../Components/WhatsappBtn'
import CookieConsent from '../Components/CookieConsent'


const Home = () => {
  return (
    <>
        <Header />
        <Hero />
        <CookieConsent/>
        <WhatsappBtn />
        <FeaturedPrroducts />
        <AboutUs />
        <AboutOurFood />
        <DeliveredTo/>
        {/* <Gallery /> */}
        <CTA />
        <Footer />
    </>
  )
}

export default Home