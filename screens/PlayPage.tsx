import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { useRef } from "react";
import {
	PanResponder,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import PlayPauseButton from "../components/PlayPauseButton";
import { useAuthStore } from "../stores/AuthStore";

const PlayPage = ({ navigation }: { navigation: any }) => {
	const token = useAuthStore((state) => state.token);
	const logout = useAuthStore((state) => state.clearToken);
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

	const pausePlayback = async () => {
		const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`, // Usa il token ottenuto dopo l'autenticazione
				"Content-Type": "application/json",
			},
		});

		if (response.status === 204) {
			console.log("Riproduzione messa in pausa!");
		} else {
			console.log("Errore nel mettere in pausa:", response);
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

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderRelease: (evt, gestureState) => {
				const { dx, dy } = gestureState;
				if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
					// Rilevato lo swipe, naviga alla pagina scan

					navigation.navigate("Scanner");
				}
			},
		})
	).current;

	return (
		<SafeAreaView className="bg-bg-main ">
			<View className="h-full w-full p-4 flex grow flex-col justify-between items-center">
				{/* Pulsanti secondari */}
				<View className="flex-row justify-between w-full">
					<TouchableOpacity
						className="flex flex-row items-center justify-center rounded-md gap-2 p-2"
						onPress={() => {
							logout();
							navigation.navigate("Home");
						}}
					>
						<SimpleLineIcons name="logout" size={16} color="#FF007A" />
						<Text className="text-accent-primary">Esci</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="flex flex-row items-center justify-center rounded-md gap-2 p-2"
						onPress={async () => {
							await getDevices();
						}}
					>
						<SimpleLineIcons
							name="screen-smartphone"
							size={16}
							color="#FF007A"
						/>
						<Text className="text-accent-primary">Device</Text>
					</TouchableOpacity>
				</View>
				<PlayPauseButton onPress={() => {}} />
				{/* Sezione per il Play/Pause con animazione delle onde 
				<View className="justify-center items-center">
					<TouchableOpacity
						className="border border-accent-primary w-64 h-64 rounded-full flex justify-center items-center"
						onPress={async () => {
							await playTrack(`3n3Ppam7vgaVa1iaRUc9Lp`);
						}}
					>
						<View className="hidden">
							<SimpleLineIcons name="control-play" size={72} color="#FF007A" />
						</View>
						<View className="">
							<SimpleLineIcons name="control-pause" size={72} color="#FF007A" />
						</View>
					</TouchableOpacity>
				</View>*/}

				{/* Sezione per rilevare lo swipe */}
				<View className="flex w-full items-center gap-2">
					<View
						className="w-full h-12 justify-center items-center bg-bg-card rounded-lg"
						{...panResponder.panHandlers}
					>
						<Text className="text-2xl font-bold text-accent-glow">SWIPE</Text>
					</View>
					<Text className="text-accent-secondary text-lg font-light">
						Fai swipe per scansionare
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};
export default PlayPage;
