import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import PlayPauseButton from "../components/PlayPauseButton";
import SwipeBar from "../components/SwipeBar";
import { useAuthStore } from "../stores/AuthStore";
import { usePlayerStore } from "../stores/PlayerStore";
import { useSpotifyApi } from "../hook/SpotifyHook";

const PlayPage = ({ navigation }: { navigation: any }) => {
	const logout = useAuthStore((state) => state.clearToken);
	const isPlaying = usePlayerStore((state) => state.isPlaying);
	const { playUserTrack, pauseUserTrack } = useSpotifyApi();

	return (
		<SafeAreaView className="bg-main ">
			<View className="h-full w-full p-4 flex grow flex-col justify-between items-center">
				{/* Pulsanti secondari */}
				<View className="flex-row justify-between w-full">
					<TouchableOpacity
						className="flex flex-row items-center justify-center rounded-md gap-2 p-2 mr-auto"
						onPress={() => {
							logout();
							navigation.navigate("Home");
						}}
					>
						<SimpleLineIcons name="logout" size={16} color="#FF007A" />
						<Text className="text-accent-primary">Esci</Text>
					</TouchableOpacity>
				</View>

				{/* Sezione per il Play/Pause */}
				<PlayPauseButton
					onPress={() => {
						if (isPlaying) return pauseUserTrack();
						return playUserTrack();
					}}
					isPlaying={isPlaying}
				/>

				{/* Sezione per rilevare lo swipe */}
				<View className="flex w-full items-center gap-2">
					<SwipeBar onSwipe={() => navigation.navigate("Scanner")} />
				</View>
			</View>
		</SafeAreaView>
	);
};
export default PlayPage;
