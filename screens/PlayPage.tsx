import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../stores/AuthStore";

const PlayPage = ({ navigation }: { navigation: any }) => {
    const token = useAuthStore((state) => state.token);
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
		<View className="bg-freshBg flex-1 justify-center items-center">
			<Text className="text-white text-2xl font-bold mb-4">
				Benvenuto su Tunez
			</Text>

			<TouchableOpacity
				className="bg-spotifyGreen text-white px-6 py-3 rounded-full mt-4 shadow-lg"
				onPress={() => navigation.navigate("Scanner")}
			>
				<Text className="text-white text-lg font-semibold">Scan</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-freshPurple text-white px-6 py-3 rounded-full mt-4 shadow-lg"
				onPress={async () => {
					await getDevices();
				}}
			>
				<Text className="text-white text-lg font-semibold">Device</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-freshBlue text-white px-6 py-3 rounded-full mt-4 shadow-lg"
				onPress={async () => {
					//await playTrack(`3n3Ppam7vgaVa1iaRUc9Lp`);
				}}
			>
				<Text className="text-white text-lg font-semibold">Play</Text>
			</TouchableOpacity>
		</View>
	);
};
export default PlayPage;
