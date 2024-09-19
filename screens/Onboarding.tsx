import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Linking,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceSelector from "../components/DeviceSelector";
import { useDeviceStore } from "../stores/DeviceStore";
import { useSpotifyApi } from "../hook/SpotifyHook";

const Onboarding = ({ navigation }: { navigation: any }) => {
	const { fetchUserDevices } = useSpotifyApi();

	const setActiveDevice = useDeviceStore((state) => state.setActiveDevice);
	const devices = useDeviceStore((state) => state.devices);
	const activeDevice = useDeviceStore((state) => state.activeDevice);
	const deviceLoading = useDeviceStore((state) => state.loading);

	useFocusEffect(
		useCallback(() => {
			fetchUserDevices();
		}, [])
	);

	useEffect(() => {
		if (!activeDevice?.is_active) setActiveDevice(null);
	}, [activeDevice]);

	const rotateAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (deviceLoading) {
			spinAnimation.start();
		} else {
			spinAnimation.reset();
		}
	}, [rotateAnim, deviceLoading]);

	const spinAnimation = Animated.loop(
		Animated.timing(rotateAnim, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: true,
		})
	);

	const rotateInterpolate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["360deg", "0deg"],
	});

	const rotateStyle = {
		transform: [{ rotate: rotateInterpolate }],
	};

	return (
		<SafeAreaView className="bg-main flex-1 justify-center items-center p-6">
			<Text className="text-text text-3xl font-extrabold mb-8 tracking-wider shadow-lg">
				Ci siamo quasi
			</Text>
			<View className="">
				<Text className="text-text text-center mb-2">
					Seleziona il dispositivo che vuoi utilizzare
				</Text>
				<DeviceSelector
					devices={devices}
					onTap={setActiveDevice}
					selectedDeviceId={activeDevice?.id}
				/>
				<TouchableOpacity
					className="bg-card p-2 rounded-md mt-4 shadow-lg shrink mx-auto flex flex-row items-center"
					onPress={async () => {
						setActiveDevice(null);
						fetchUserDevices();
					}}
				>
					<View className="rotate-45">
						<Animated.View style={rotateStyle}>
							<SimpleLineIcons name="refresh" size={16} color="#FFFFFF" />
						</Animated.View>
					</View>
					<Text className="text-white ml-2">Aggiorna</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				className={`bg-accent-primary px-8 py-4 rounded-full my-auto shadow-lg flex flex-row items-center ${
					!activeDevice && "opacity-40"
				}`}
				onPress={() => {
					if (activeDevice) {
						navigation.navigate("PlayPage");
					} else {
						Toast.show("Seleziona un dispositivo", {
							position: Toast.positions.TOP,
							duration: Toast.durations.SHORT,
						});
					}
				}}
			>
				<SimpleLineIcons name="control-play" size={16} color="#FFFFFF" />
				<Text className="text-white text-lg font-semibold tracking-wide ml-2">
					Gioca
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="bg-card px-8 py-4 rounded-full mt-auto shadow-lg flex flex-row items-center"
				onPress={() => {
					Linking.openURL("spotify:track:7sj9VfVtmcEZBDbRAsVXWY");
				}}
			>
				<Text className="text-white text-lg font-semibold tracking-wide mr-2">
					Apri Spotify
				</Text>
				<SimpleLineIcons name="social-spotify" size={24} color="#FFFFFF" />
			</TouchableOpacity>

			<Text className="text-text text-center px-8 mt-4">
				Per giocare è necessario avere Spotify aperto e attivo su almeno un
				dispositivo.
			</Text>
		</SafeAreaView>
	);
};
export default Onboarding;
