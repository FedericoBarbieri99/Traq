import { StatusBar } from "expo-status-bar";
import React from "react";
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
		"&redirect_uri=" + encodeURIComponent("exp://192.168.68.129:8081");
	spotifyAuthUrl += "&show_dialog=" + encodeURIComponent(true);

	const token = useAuthStore((state) => state.token);

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
		//Linking.openURL(spotifyAuthUrl);
	};
	var deviceId = "0ef2d0b318d051273851f8aedd6cb33254be9782";

	const playTrack = async (trackUri: string) => {
		const response = await fetch(
			`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uris: ["spotify:track:7sj9VfVtmcEZBDbRAsVXWY"], // Ad esempio, 'spotify:track:TRACK_ID'
					position_ms: 56000,
				}),
			}
		);

		if (response.status === 204) {
			console.log("Traccia in riproduzione!");
		} else {
			console.table(response);
		}
	};

	// Esempio per aprire una traccia
	const getDevices = async () => {
		const response = await fetch(
			`https://api.spotify.com/v1/me/player/devices`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const data = await response.json();
		console.log("Dispositivi disponibili:", data);
	};

	return (
		<View className="flex-1 items-center justify-center bg-gradient-to-tr from-indigo-500  to-emerald-500 to-90%">
			<StatusBar style="auto" />
			<Text>App di AAAA</Text>

			{token != null ? (
				<>
					<Button title="Scan" onPress={() => navigation.navigate("Scanner")} />
					<Button
						title="Device"
						onPress={async () => {
							await getDevices();
						}}
					/>
					<Button
						title="Play"
						onPress={async () => {
							//await playTrack(`3n3Ppam7vgaVa1iaRUc9Lp`);
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
