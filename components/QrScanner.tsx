import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import ScannerOverlay from "./ScanenrOverlay";

export default function QRScanner() {
	const [scan, setScan] = useState<string>("");
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	return (
		<View className="h-full w-full">
			<CameraView
				className="h-full w-full"
				facing={"back"}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
				onBarcodeScanned={(scanningResult: BarcodeScanningResult) =>
					setScan(scanningResult.data)
				}
			>
				<ScannerOverlay />
			</CameraView>
			<Text>{scan}</Text>
		</View>
	);
}
