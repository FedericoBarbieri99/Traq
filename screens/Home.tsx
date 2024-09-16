import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, Linking, Text, View } from "react-native";
import { useAuthStore } from "../stores/AuthStore";

const Home = ({ navigation }: { navigation: any }) => {
	var spotifyAuthUrl = "https://accounts.spotify.com/authorize";
	spotifyAuthUrl += "?response_type=token";
	spotifyAuthUrl +=
		"&client_id=" +
		encodeURIComponent(process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "");
	spotifyAuthUrl +=
		"&scope=" +
		encodeURIComponent(
			"user-read-private user-read-email user-modify-playback-state user-read-playback-state"
		);
	spotifyAuthUrl +=
		"&redirect_uri=" + encodeURIComponent("exp://192.168.1.17:8081");
	spotifyAuthUrl += "&show_dialog=" + encodeURIComponent(true);

	const token = useAuthStore((state) => state.token);

	const connectToSpotify = () => {
		Linking.openURL(spotifyAuthUrl);
	};

	const playTrack = async (token: string, trackUri: string) => {
		const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uris: [trackUri], // Ad esempio, 'spotify:track:TRACK_ID'
			}),
		});

		if (response.status === 204) {
			console.log("Traccia in riproduzione!");
		} else {
			console.log(response);
			console.error("Errore nella riproduzione della traccia");
		}
	};

	const playSpotifyTrack = async () => {
		const trackUri = "spotify:track:7sj9VfVtmcEZBDbRAsVXWY?si=14aecd2dc13048d7"; // Sostituisci con l'URI della traccia che vuoi riprodurre
		if (!token) return;
		try {
			await playTrack(token, trackUri);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<View className="flex-1 items-center justify-center bg-white">
			<StatusBar style="auto" />
			<Text>App di AAAA</Text>

			{token != null ? (
				<>
					<Button title="Scan" onPress={() => navigation.navigate("Scanner")} />
					<Button
						title="Device"
						onPress={async () => {
							await playSpotifyTrack();
						}}
					/>
				</>
			) : (
				<>
					<Button title="Collega dai" onPress={connectToSpotify} />
				</>
			)}
		</View>
	);
};
export default Home;
