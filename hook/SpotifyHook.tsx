import { useAuthStore } from "../stores/AuthStore";
import { useDeviceStore } from "../stores/DeviceStore";
import {
	fetchDevices,
	playTrack,
	pausePlayback,
	connectToSpotify,
} from "../helpers/SpotifyHelper";

export const useSpotifyApi = () => {
	const token = useAuthStore((state) => state.token);
	const setDevices = useDeviceStore((state) => state.setDevices);
	const setLoading = useDeviceStore((state) => state.setLoading);

	const authenticateOnSpotify = () => {
		connectToSpotify(
			process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID ?? "",
			"exp://192.168.68.106:8081"
		);
	};

	const fetchUserDevices = async () => {
		if (token) {
			setLoading(true);
			await fetchDevices(token, setDevices, setLoading);
			setLoading(false);
		}
	};

	const playUserTrack = (trackUri: string, deviceId: string) => {
		if (token) {
			playTrack(token, trackUri, deviceId);
		}
	};

	const pauseTrack = () => {
		if (token) {
			pausePlayback(token);
		}
	};

	return {
		fetchUserDevices,
		playUserTrack,
		pauseTrack,
		authenticateOnSpotify,
	};
};
