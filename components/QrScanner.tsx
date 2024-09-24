import {
	BarcodeScanningResult,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import ScannerOverlay from "./ScannerOverlay";
import { useSpotifyApi } from "../hook/SpotifyHook";
import Toast from "react-native-root-toast";

export default function QRScanner({
	onScanSuccess,
}: {
	onScanSuccess: (trackId: string) => void;
}) {
	const [permission, requestPermission] = useCameraPermissions();
	const { fetchTrackData } = useSpotifyApi();
	const [loading, setLoading] = useState(false);
	const [prevScan, setPrevScan] = useState<string>();
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

	const onScan = async (res: string) => {
		if (loading) return;
		setLoading(true);
		if (res === prevScan || !res.startsWith("https://pynguino.xyz/api/traq/")) {
			Toast.show("Qr non valido");
			return setLoading(false);
		}

		fetchTrackData(res)
			.then((id) => onScanSuccess(id))
			.catch((e) => Toast.show(e));
		setPrevScan(res);
	};

	return (
		<View className={"absolute grow top-0 bottom-0 h-full w-full"}>
			<CameraView
				className="h-full w-full"
				facing={"back"}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
				onBarcodeScanned={(scanningResult: BarcodeScanningResult) =>
					onScan(scanningResult.data)
				}
			>
				<ScannerOverlay />
			</CameraView>
		</View>
	);
}
