import { create } from "zustand";

interface ScanState {
  scannedData: string | null;
  setScannedData: (data: string | null) => void;
}

export const useScanStore = create<ScanState>((set) => ({
  scannedData: null,
  setScannedData: (data) => set({ scannedData: data }),
}));
