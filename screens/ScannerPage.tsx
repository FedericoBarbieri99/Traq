import React from "react";
import { View } from "react-native";
import QRScanner from "../components/QrScanner";

const ScannerPage = (navigation: any) => {
	/*const onSuccess = (result: IDetectedBarcode[]) => {
		console.log(result); // è il risultato del QR code scansionato
	};
*/
	return (
		<View className="flex  grow bg-cyan-200">
		
				<QRScanner />
		
		</View>
	);
};

export default ScannerPage;
