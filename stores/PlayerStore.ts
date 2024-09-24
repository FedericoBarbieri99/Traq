import { create } from "zustand";

interface PlayerState {
	isPlaying: boolean;
	trackId: string | null;
	setTrackId: (id: string | null) => void;
	setPlayerState: (state: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
	isPlaying: false,
	trackId: "7sj9VfVtmcEZBDbRAsVXWY",
	setTrackId: (id: string | null) => set({ trackId: id }),
	setPlayerState: (state: boolean) => set({ isPlaying: state }),
}));
