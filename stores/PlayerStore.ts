import { create } from "zustand";

interface PlayerState {
	isPlaying: boolean;
	trackId: string | null;
	setPlayerState: (state: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
	isPlaying: false,
	trackId: "7sj9VfVtmcEZBDbRAsVXWY",
	setPlayerState: (state: boolean) => set({ isPlaying: state }),
}));
