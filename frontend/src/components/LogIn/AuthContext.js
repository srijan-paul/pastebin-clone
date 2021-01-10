import React, { useContext, useState } from "react";

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	return (
		<div>
			<AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
		</div>
	);
}
