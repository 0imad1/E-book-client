import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";

const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false);
    const navigate = useNavigate();

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    const handleNavigationClick = (path) => {
        // Open the external link in a new browser window in the background
        const newWindow = window.open("https://www.profitablecpmrate.com/ikexr802?key=5ee1b3e4b43a0a7eaf65cc5047e256ff", "_blank", "width=800,height=600");
        if (newWindow) {
            // Attempt to send the new window to the background
            newWindow.blur();
            // Bring the current window back to the front
            window.focus();
        }

        // Navigate to the specified path in the current tab
        navigate(path);

        // Refresh the page
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand" onClick={() => handleNavigationClick("/")}>
                    <span className="hotel-color">PdfVerse</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to={"/browse-all-books"}
                                onClick={() => handleNavigationClick("/browse-all-books")}>
                                Browse all Books
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/adminPanel"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item dropdown">
                            {isLoggedIn && userRole === "ROLE_ADMIN" && (
                                <a
                                    className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={handleAccountClick}>
                                    {" "}
                                    Account
                                </a>
                            )}

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/GJWQ"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
