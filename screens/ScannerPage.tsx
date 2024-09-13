import React from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRScanner from "../components/QrScanner";

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
			<QRScanner />
		</View>
	);
};

export default ScannerPage;
