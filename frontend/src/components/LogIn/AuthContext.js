import React, { useContext, useState } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
	// const [currentUser, setCurrentUser] = useState();

	return (
		<div>
			<AuthContext.Provider>{children}</AuthContext.Provider>
		</div>
	);
}
