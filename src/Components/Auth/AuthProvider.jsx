import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Use named export

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleLogin = (token) => {
		const decodedUser = jwtDecode(token); // Use jwtDecode instead of jwt_decode
		localStorage.setItem("userId", decodedUser.sub);
		localStorage.setItem("userRole", decodedUser.roles);
		localStorage.setItem("token", token);
		setUser(decodedUser);
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
