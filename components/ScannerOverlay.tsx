import React from "react";
import { View } from "react-native";

export default function ScannerOverlay() {
	return (
		<View className="h-full w-full flex items-center justify-center overflow-hidden">
			<View className=" relative w-64 aspect-square  border-spacing-5">
				<View className="h-full w-full opacity-20 bg-bg-main absolute rounded-xl" />
				<View className="w-10 h-10 border-t-2 border-l-2 border-accent-primary rounded-tl-xl top-0 left-0 absolute" />
				<View className="w-10 h-10 border-t-2 border-r-2 border-accent-primary rounded-tr-xl top-0 right-0 absolute " />
				<View className="w-10 h-10 border-b-2 border-l-2 border-accent-primary rounded-bl-xl bottom-0 left-0 absolute" />
				<View className="w-10 h-10 border-b-2 border-r-2 border-accent-primary rounded-br-xl bottom-0 right-0 absolute" />
			</View>
		</View>
	);
}
