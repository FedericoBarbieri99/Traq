import React from "react";
import { Button, View } from "react-native";
import QRScanner from "../components/QrScanner";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const ScannerPage = ({ navigation }: { navigation: any }) => {
	/*const onSuccess = (result: IDetectedBarcode[]) => {
		console.log(result); // è il risultato del QR code scansionato
	};
*/
	return (
		<View className=" grow bg-cyan-200 relative">
			<SafeAreaView className="z-50">
				<Button title="X" onPress={() => {navigation.navigate("Home")}} />
			</SafeAreaView>
			<QRScanner className="absolute grow top-0 bottom-0 h-full w-full"/>
		</View>
	);
};

export default ScannerPage;
