import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
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
import { useAuthStore } from "../stores/AuthStore";
import { useDeviceStore } from "../stores/DeviceStore";
import { useFocusEffect } from "@react-navigation/native";

const Onboarding = ({ navigation }: { navigation: any }) => {
	const token = useAuthStore((state) => state.token);

	useEffect(() => {
		if (!token) navigation.navigate("Home");
	}, [token]);

	const setDevices = useDeviceStore((state) => state.setDevices);
	const setActiveDevice = useDeviceStore((state) => state.setActiveDevice);
	const devices = useDeviceStore((state) => state.devices);
	const activeDevice = useDeviceStore((state) => state.activeDevice);
	const deviceLoading = useDeviceStore((state) => state.loading);
	const setLoading = useDeviceStore((state) => state.setLoading);

	const fetchDevices = async () => {
		setLoading(true);
		const response = await fetch(
			"https://api.spotify.com/v1/me/player/devices",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.json();

		if (response.ok) {
			setDevices(data.devices);
		} else {
			console.error("Errore nel recuperare i dispositivi:", response);
		}
		setLoading(false);
	};

	useFocusEffect(
		useCallback(() => {
			fetchDevices();
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
						await fetchDevices();
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
                        navigation.navigate("PlayPage")
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
