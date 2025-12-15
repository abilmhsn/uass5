export type WasteCategory = 'Organik' | 'Plastik' | 'Kertas' | 'Logam' | 'B3' | 'Residu';

export interface WasteAnalysisResult {
  is_sampah: boolean;
  kategori_sampah: WasteCategory | null;
  estimasi_harga_jual_rp_per_kg: number | null;
  saran_pengolahan: string | null;
}

export interface HistoryItem extends WasteAnalysisResult {
  id: string;
  date: string;
  imageUrl: string;
}

export type ScreenName = 'Login' | 'Home' | 'Scan' | 'History' | 'Map';
