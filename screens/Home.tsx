import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { useEffect } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useSpotifyApi } from "../hook/SpotifyHook";
import { useAuthStore } from "../stores/AuthStore";

const Home = ({ navigation }: { navigation: any }) => {
	const { authenticateOnSpotify } = useSpotifyApi();
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

			navigation.navigate("Onboarding");
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
		<View className="bg-main flex-1 justify-center items-center p-6">
			<Text className="text-text text-3xl font-extrabold mb-8 tracking-wider shadow-lg">
				Benvenuto su Tunez
			</Text>

			<TouchableOpacity
				className="bg-accent-primary px-8 py-4 rounded-full my-4 shadow-lg flex flex-row items-center"
				onPress={authenticateOnSpotify}
			>
				<Text className="text-white text-lg font-semibold tracking-wide mr-2">
					Collegati a Spotify
				</Text>
				<SimpleLineIcons name="social-spotify" size={24} color="#FFFFFF" />
			</TouchableOpacity>
		</View>
	);
};
export default Home;
