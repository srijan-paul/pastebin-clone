import React, { useContext, useState } from "react";

export const UserContext = React.createContext({
	name: "Guest",
	isGuest: true,
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
