import React, { useRef, useEffect, useState } from "react";
import { PanResponder, Text, View, Animated, Easing } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const SwipeBar = ({ onSwipe }: { onSwipe: () => void }) => {
	// Animazioni per i chevron
	const chevron1Anim = useRef(new Animated.Value(0)).current;
	const chevron2Anim = useRef(new Animated.Value(0)).current;

	// Animazione per il background
	const backgroundAnim = useRef(new Animated.Value(0)).current;

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderRelease: (evt, gestureState) => {
				const { dx, dy } = gestureState;
				if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
					onSwipe(); // Rilevato lo swipe, esegui azione
				}
			},
		})
	).current;

	// Animazione chevron
	useEffect(() => {
		const animate = (anim: Animated.Value, direction: number) =>
			Animated.loop(
				Animated.sequence([
					Animated.timing(anim, {
						toValue: 1,
						duration: 800,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
					Animated.timing(anim, {
						toValue: 0,
						duration: 800,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
				])
			).start();

		animate(chevron1Anim, 40);
		animate(chevron2Anim, -40);
	}, []);

	// Animazione background gradient
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(backgroundAnim, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: false,
					easing: Easing.inOut(Easing.ease),
				}),
				Animated.timing(backgroundAnim, {
					toValue: 0,
					duration: 1500,
					useNativeDriver: false,
					easing: Easing.inOut(Easing.ease),
				}),
			])
		).start();
	}, []);

	// Interpolazione del gradiente
	const gradientColors = backgroundAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ["#FFD700", "#00FFE0"],
	});

	// Interpolazione per i chevron
	const chevronStyle = (anim: Animated.Value, direction: number) => ({
		transform: [
			{
				translateX: anim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, direction],
				}),
			},
			{
				scale: anim.interpolate({ inputRange: [0, 20], outputRange: [1, 10] }),
			},
		],
	});

	return (
		<Animated.View
			className="w-full h-12 justify-center items-center rounded-lg overflow-hidden"
			{...panResponder.panHandlers}
		>
			{/* Sfondo con gradiente animato */}
			<AnimatedLinearGradient
				colors={[gradientColors, gradientColors]} // Usa il gradiente animato
				start={{ x: 0.5, y: 0.5 }}
				end={{ x: 1, y: 1 }}
				className={"absolute top-0 bottom-0 right-0 left-0 rounded-md"}
			/>
			<Text className="text text-lg font-light">
				Fai swipe per scansionare
			</Text>

			{/* Chevron sinistro */}
			<Animated.View
				className={"absolute left-16"}
				style={chevronStyle(chevron2Anim, -40)}
			>
				<SimpleLineIcons name="arrow-left" size={12} color="#0D0D0D" />
			</Animated.View>

			{/* Chevron destro */}
			<Animated.View
				className={"absolute right-16"}
				style={[chevronStyle(chevron2Anim, 40)]}
			>
				<SimpleLineIcons name="arrow-right" size={12} color="#0D0D0D" />
			</Animated.View>
		</Animated.View>
	);
};

export default SwipeBar;
