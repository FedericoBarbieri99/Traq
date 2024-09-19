import React, { useEffect } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import { useAuthStore } from "../stores/AuthStore";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const Home = ({ navigation }: { navigation: any }) => {
	const setToken = useAuthStore((state) => state.setToken);
	const token = useAuthStore((state) => state.token);

	const baseUrl = "https://accounts.spotify.com/authorize";
	const params = new URLSearchParams({
		response_type: "token",
		client_id: process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
		scope:
			"user-read-private user-read-email user-modify-playback-state user-read-playback-state",
		redirect_uri: "exp://192.168.68.106:8081",
		show_dialog: "true",
	});

	const spotifyAuthUrl = `${baseUrl}?${params.toString()}`;

	const connectToSpotify = () => {
		Linking.canOpenURL(spotifyAuthUrl)
			.then((supported) => {
				if (!supported) {
					console.log("Spotify app not installed");
					// Apri il link nel browser
					Linking.openURL(spotifyAuthUrl);
				} else {
					Linking.openURL(spotifyAuthUrl);
				}
			})
			.catch((err) => console.error("Error checking Spotify app:", err));
		// Linking.openURL(spotifyAuthUrl);
	};

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

	useEffect(() => {
		if (!token) navigation.navigate("Home");
	});

	return (
		<View className="bg-main flex-1 justify-center items-center p-6">
			<Text className="text-text text-3xl font-extrabold mb-8 tracking-wider shadow-lg">
				Benvenuto su Tunez
			</Text>

			<TouchableOpacity
				className="bg-accent-primary px-8 py-4 rounded-full my-4 shadow-lg flex flex-row items-center"
				onPress={connectToSpotify}
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
