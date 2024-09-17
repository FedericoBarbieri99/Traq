import React, { useEffect } from "react";
import AppNavigator from "./navigation/AppNavigator";
import { registerRootComponent } from "expo";
import { useAuthStore } from "./stores/AuthStore";
import { Linking } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";

const App = () => {
	const setToken = useAuthStore((state) => state.setToken);

	const handleRedirect = (event: { url: string }) => {
		const { url } = event;

		// Estrai il token dall'URL di redirect (es. da tunez://callback#access_token=YOUR_TOKEN)
		const tokenMatch = url.match(/access_token=([^&]*)/);
		const token = tokenMatch ? tokenMatch[1] : null;

		if (token) {
			// Salva il token nello stato usando Zustand
			setToken(token);
			console.log("Access Token salvato:", token);
			Toast.show("Access Token salvato!", {
				duration: Toast.durations.LONG,
			});
		}
	};

	useEffect(() => {
		// Ascolta l'evento di deep linking
		const subscription = Linking.addEventListener("url", handleRedirect);

		return () => {
			// Pulisci l'ascoltatore
			subscription.remove();
		};
	}, []);
	return (
		<RootSiblingParent>
			<AppNavigator />
		</RootSiblingParent>
	);
};

export default App;
registerRootComponent(App);
