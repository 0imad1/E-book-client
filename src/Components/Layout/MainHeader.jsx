import React from "react";
import BookSearch from "../Common/BookSearch";

const MainHeader = () => {
    return (
        <header className="header-banner">
            <div className="overlay"></div>
            <div className="overlay-content">
                <div className="animated-texts">
                    <h1>
                        Welcome to <span className="hotel-color">Readly</span>
                    </h1>
                    <h4>Download any Book you want in PDF Format.</h4>
                </div>
                <div className="search-bar-container">
                    <BookSearch />
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
