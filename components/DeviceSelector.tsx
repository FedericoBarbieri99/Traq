import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import { Device } from "../stores/DeviceStore";

const DeviceSelector = ({
	devices,
	selectedDeviceId,
	onTap,
}: {
	devices: Device[];
	selectedDeviceId?: string;
	onTap: (device: Device) => void;
}) => {
	const DeviceIcon = ({ type }: { type: string }) => {
		switch (type) {
			case "Computer":
				return (
					<SimpleLineIcons name="screen-desktop" color={"#FFFFFF"} size={16} />
				);
			case "Smartphone":
				return (
					<SimpleLineIcons
						name="screen-smartphone"
						color={"#FFFFFF"}
						size={16}
					/>
				);
			default:
				return <SimpleLineIcons name="volume-2" color={"#FFFFFF"} size={16} />;
		}
	};

	const onPress = (device: Device) => {
		if (device.is_active) {
			onTap(device);
		} else {
			Toast.show("Dispositivo non attivo", {
				position: Toast.positions.TOP,
				duration: Toast.durations.SHORT,
			});
		}
	};

	return (
		<View className="h-min max-h-32">
			<ScrollView className="flex bg-card text-white grow-0  rounded-md overflow-hidden">
				{devices.length === 0 ? (
					<Text className="p-3 text-white text-center">
						Nessun dispositivo trovato
					</Text>
				) : (
					devices.map((device) => (
						<TouchableOpacity
							key={device.id}
							className={`p-3 border-main border-y first:border-top-0 last:border-b-0 ${
								device.id === selectedDeviceId && "bg-accent-primary"
							}`}
							onPress={() => onPress(device)}
						>
							<View
								className={`flex flex-row items-center ${
									!device.is_active && "opacity-40"
								}`}
							>
								<DeviceIcon type={device.type} />
								<Text className="text-white ml-2">{device.name}</Text>
							</View>
						</TouchableOpacity>
					))
				)}
			</ScrollView>
		</View>
	);
};

export default DeviceSelector;
