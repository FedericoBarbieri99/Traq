import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Text, View } from "react-native";

const Home = ({ navigation }: { navigation: any }) => {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<StatusBar style="auto" />
			<Text>App di AAAA</Text>

			<Button title="Dai" onPress={() => navigation.navigate("Scanner")} />
		</View>
	);
};
export default Home;
