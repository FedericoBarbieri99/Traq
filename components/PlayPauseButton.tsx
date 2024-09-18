import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
	useAnimatedProps,
	withDelay,
	SharedValue,
} from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PlayPauseButton = ({ onPress }: { onPress: () => void }) => {
	const numberOfWaves = 8;
	const progressValues = Array.from({ length: numberOfWaves }, () =>
		useSharedValue(0)
	);

	const animateWaves = () => {
		progressValues.forEach((progress, index) => {
			progress.value = withDelay(
				index * 600, // Delay each wave by 400ms
				withRepeat(
					withTiming(1, {
						duration: 4000,
						easing: Easing.bezier(0.2, 1.08, 0.66, 1.31),
					}),
					-1,
					false
				)
			);
		});
	};

	const createAnimatedProps = (
		progress: SharedValue<number>,
		baseRadius: number,
		maxRadius: number
	) =>
		useAnimatedProps(() => ({
			r: baseRadius + progress.value * maxRadius,
			opacity: 1 - progress.value,
		}));

	const getColor = (index: number) => {
		switch (index % 4) {
			case 0:
				return "#FF007A";
			case 1:
				return "#00FFE0";
			case 2:
				return "#FFD700";
			case 3:
				return "#FF4D4D";
			default:
				return "#FFFFFF";
		}
	};

	React.useEffect(() => {
		animateWaves();
	}, []);

	return (
		<View className="flex-1 justify-center items-center">
			{/* Container per le onde */}
			<View className="absolute">
				<Svg height="600" width="600">
					{progressValues.map((progress, index) => (
						<AnimatedCircle
							key={index}
							cx="300"
							cy="300"
							fill={getColor(index)}
							animatedProps={createAnimatedProps(
								progress,
								85,
								Math.floor(Math.random() * (50 - 35 + 1) + 35)
							)}
						/>
					))}
				</Svg>
			</View>

			{/* Pulsante Play/Pause */}
			<TouchableOpacity
				className="bg-card w-48 h-48 rounded-full flex justify-center items-center"
				onPress={onPress}
			>
				<SimpleLineIcons name="control-pause" size={72} color="#FF007A" />
			</TouchableOpacity>
		</View>
	);
};

export default PlayPauseButton;
