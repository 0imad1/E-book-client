import React, { useContext } from "react"
import MainHeader from "../Layout/MainHeader"
import EbookService from "../Common/EbookService"
import Parallax from "../Common/Parallax"
import BookCarousel from "../Common/BookCarousel"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../Auth/AuthProvider"
import {Helmet} from "react-helmet"
import Banner from "../Common/Banner"
import AdComponent from "../Common/AdComponent"
import AdBanner from "../Common/AdBanner"


const Home = () => {
	const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")


	return (
		<><Helmet>
			<title>PDFVerse</title>
			<meta name="description" content="PDFVerse - A user manuals eBook library for eBook downloads"/>
			<link rel="canonical" href="/"/>
		</Helmet>
		<body>
		<section>
			{message && <p className="text-warning px-5">{message}</p>}
			{currentUser && (
				<div className="  text-success text-center"> You are logged-In as {currentUser}</div>
			)}
			<MainHeader />
			<AdBanner/>
			<div className="container">

				<AdComponent/>
				<BookCarousel />
				<Parallax />
				<EbookService />
				<Parallax />
				<BookCarousel />
				<Banner />
			</div>
		</section>
		</body></>
	)
}

export default Home