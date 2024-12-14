import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "./Header";
import AdBanner from "./AdBanner";

const EbookService = () => {
	return (
		<>
			<Container className="mb-2">
				<Header title={"Our Services"} />

				<Row className="mt-4">
					<h4 className="text-center">
						Original books in <span className="hotel-color"> Thebookverse - </span>
						<span className="gap-2"> PDF Format</span>
					</h4>
				</Row>
				<hr />

				<p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#555", textAlign: "justify" }}>
					<strong>We believe</strong> that everyone should have simple, easy access to knowledge and information. 
					Many people in developing countries face barriers to finding their favorite books, with libraries and 
					bookstores often far away or unaffordable. Our mission is to help people connect with the resources 
					to get your PDF and EPUB, without the hassle of sign-ups. If you share our vision for open access 
					to information, <em>consider supporting us below.</em>
				</p>
			</Container>
			<AdBanner/>
			<hr />
		</>
	);
}

export default EbookService;
