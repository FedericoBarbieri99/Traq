import { Linking } from "react-native";

// Sposta l'accesso a Zustand nei componenti o in un custom hook
export const fetchDevices = async (
	token: string,
	setDevices: (devices: any[]) => void,
	setLoading: (loading: boolean) => void
) => {
	setLoading(true);
	const response = await fetch("https://api.spotify.com/v1/me/player/devices", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (response.ok) {
		setDevices(data.devices);
	} else {
		console.error("Errore nel recuperare i dispositivi:", response);
	}
	setLoading(false);
};

export const playTrack = async (
	token: string,
	trackUri: string,
	deviceId: string
) => {
	const response = await fetch(
		`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
		{
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uris: [trackUri], // Ad esempio, 'spotify:track:TRACK_ID'
			}),
		}
	);

	if (response.status === 204) true;

	console.error(response);
	return false;
};

export const pausePlayback = async (token: string, deviceId: string) => {
	const response = await fetch(
		`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
		{
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uris: ["spotify:track:3mkOlbSv5RYadx0JsjTrKq"], // Canzone 10 minuti di silenzio
			}),
		}
	);

	if (response.status === 204) return true;

	console.log("Errore nel mettere in pausa:", response);
	return false;
};

export const connectToSpotify = (clientId: string, redirectUri: string) => {
	const baseUrl = "https://accounts.spotify.com/authorize";
	const params = new URLSearchParams({
		response_type: "token",
		client_id: clientId,
		scope:
			"user-read-private user-read-email user-modify-playback-state user-read-playback-state",
		redirect_uri: redirectUri,
		show_dialog: "true",
	});

	const spotifyAuthUrl = `${baseUrl}?${params.toString()}`;
	Linking.canOpenURL(spotifyAuthUrl)
		.then((supported) => {
			if (!supported) {
				console.log("Spotify app not installed");
				// Apri il link nel browser
				Linking.openURL(spotifyAuthUrl);
			} else {
				Linking.openURL(spotifyAuthUrl);
			}
		})
		.catch((err) => console.error("Error checking Spotify app:", err));
};
