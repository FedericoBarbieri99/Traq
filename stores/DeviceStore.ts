import { create } from "zustand";

export interface Device {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
	supports_volume: boolean;
}

interface DeviceState {
	devices: Device[];
	activeDevice: Device | null;
	loading: boolean;
	setLoading: (value: boolean) => void;
	setDevices: (devices: Device[]) => void;
	setActiveDevice: (device: Device | null) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
	devices: [],
	activeDevice: null,
	loading: true,
	setLoading: (value: boolean) => set({ loading: value }),
	// Funzione per aggiornare l'elenco dei dispositivi
	setDevices: (
		devices: {
			id: string;
			is_active: boolean;
			is_private_session: boolean;
			is_restricted: boolean;
			name: string;
			type: string;
			volume_percent: number;
			supports_volume: boolean;
		}[]
	) => set({ devices }),

	// Funzione per selezionare il dispositivo attivo
	setActiveDevice: (device: Device | null) => set({ activeDevice: device }),
}));
