import React, { useEffect } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../stores/AuthStore";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const Onboarding = ({ navigation }: { navigation: any }) => {
	const token = useAuthStore((state) => state.token);

	useEffect(() => {
		if (!token) navigation.navigate("Home");
	});

	return (
		<View className="bg-main flex-1 justify-center items-center p-6">
			<Text className="text-text text-3xl font-extrabold mb-8 tracking-wider shadow-lg">
				Ci siamo quasi
			</Text>

			<TouchableOpacity
				className="bg-accent-primary px-8 py-4 rounded-full my-4 shadow-lg flex flex-row items-center"
				onPress={() => {
					Linking.openURL("spotify:track:7sj9VfVtmcEZBDbRAsVXWY").then(() =>
						navigation.navigate("Scanner")
					);
				}}
			>
				<Text className="text-white text-lg font-semibold tracking-wide mr-2">
					Apri Spotify
				</Text>
				<SimpleLineIcons name="social-spotify" size={24} color="#FFFFFF" />
			</TouchableOpacity>

			<Text className="text-text text-center px-8">
				Per giocare è necessario che tu abbia Spotify aperto e attivo sul tuo
				dispositivo.
			</Text>
		</View>
	);
};
export default Onboarding;
