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

const Home = () => {
  return (
    <>
        <Header />
        <Hero />
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