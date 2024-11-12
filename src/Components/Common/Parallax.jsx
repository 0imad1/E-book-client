import React from "react"
import { Container } from "react-bootstrap"
import AdComponent from "./AdComponent"

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Download Books in <span className="hotel-color">PDFVerse</span>
					</h1>
					<h3>We offer the best Book for Free.</h3>
				</div>
			</Container>
			<AdComponent/>
		</div>
	)
}

export default Parallax