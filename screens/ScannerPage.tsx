import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRScanner from "../components/QrScanner";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const ScannerPage = ({ navigation }: { navigation: any }) => {
	return (
		<View className="grow bg-cyan-200 relative flex flex-col">
			<SafeAreaView className="z-50 px-4 flex relative grow-0 shrink">
				<TouchableOpacity
					className="text-accent-primary text-xl  ml-auto"
					onPress={() => {
						navigation.navigate("PlayPage");
					}}
				>
					<SimpleLineIcons name="close" size={24} color="#FF007A" />
				</TouchableOpacity>
			</SafeAreaView>
			<SafeAreaView className="z-10 px-4 flex w-full grow-0 shrink opacity-40 bg-main absolute"></SafeAreaView>

			<QRScanner />
		</View>
	);
};

export default ScannerPage;
