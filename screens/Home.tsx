import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Linking } from "react-native";
import { Button, Text, View } from "react-native";

const Home = ({ navigation }: { navigation: any }) => {
	const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=exp://192.168.1.17:8081&scope=user-read-private%20user-read-email`;

	const connectToSpotify = () => {
		Linking.openURL(spotifyAuthUrl);
	};

	const handleRedirect = (event: { url: any }) => {
		const { url } = event;

		// Estrai l'access token dall'URL di redirect
		const token = url.match(/access_token=([^&]*)/)[1];

		console.log("Access Token:", token);
		// Usa il token per fare richieste all'API di Spotify
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
		<View className="flex-1 items-center justify-center bg-white">
			<StatusBar style="auto" />
			<Text>App di AAAA</Text>

			<Button title="Dai" onPress={() => navigation.navigate("Scanner")} />
			<Button title="Collega dai" onPress={connectToSpotify} />
		</View>
	);
};
export default Home;
