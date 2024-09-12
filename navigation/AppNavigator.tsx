// navigation/AppNavigator.tsx

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import HomeScreen from "../screens/Home";
import ScannerPage from "../screens/ScannerPage";

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen
					name="Scanner"
					options={{ headerShown: false }}
					component={ScannerPage}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
