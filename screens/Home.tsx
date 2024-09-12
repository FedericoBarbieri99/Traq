import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";
import QRScanner from "../components/QrScanner";

const Home = ({ navigation }: { navigation: any }) => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text>App di AAAA</Text>

			<Button title="Dai" onPress={() => navigation.navigate("Scanner")} />
			<StatusBar style="auto" />
		</View>
	);
};
export default Home;
