import { registerRootComponent } from "expo";
import React from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import AppNavigator from "./navigation/AppNavigator";
import { StatusBar } from "expo-status-bar";

const App = ({ navigation }: { navigation: any }) => {
	return (
		<RootSiblingParent>
			<StatusBar style="light" />
			<AppNavigator />
		</RootSiblingParent>
	);
};

export default App;
registerRootComponent(App);
