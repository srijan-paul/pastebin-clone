import React from "react";

const UserContext = React.createContext({
	name: "Guest",
	isGuest: true,
});

export default UserContext;

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
