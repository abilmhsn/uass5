export type WasteCategory = 'Organik' | 'Plastik' | 'Kertas' | 'Logam' | 'B3' | 'Residu';

export interface WasteAnalysisResult {
  is_sampah: boolean;
  kategori_sampah: WasteCategory | null;
  estimasi_harga_jual_rp_per_kg: number | null;
  saran_pengolahan: string | null;
}

export interface HistoryItemType {
  id: number;
  type: string;
  date: string;
  amount: string;
  price: number;
  status: string;
  // Optional fields for compatibility if needed
  kategori_sampah?: WasteCategory | null; 
}

export type ScreenName = 'Login' | 'Home' | 'Scan' | 'History' | 'Map';
