import React from 'react';
import { View, Text } from 'react-native';
import { WasteAnalysisResult } from '../types/WasteResult';
import { Leaf, Recycle, FileText, Hammer, Zap, Trash2, DollarSign, Info } from 'lucide-react-native';

interface WasteCardProps {
  result: WasteAnalysisResult;
}

const getCategoryIcon = (category: string | null) => {
  switch (category) {
    case 'Organik': return <Leaf size={24} color="#16a34a" />;
    case 'Plastik': return <Recycle size={24} color="#2563eb" />;
    case 'Kertas': return <FileText size={24} color="#ca8a04" />;
    case 'Logam': return <Hammer size={24} color="#4b5563" />;
    case 'B3': return <Zap size={24} color="#dc2626" />;
    default: return <Trash2 size={24} color="#9ca3af" />;
  }
};

const getCategoryColor = (category: string | null) => {
  switch (category) {
    case 'Organik': return 'bg-green-100 border-green-200';
    case 'Plastik': return 'bg-blue-100 border-blue-200';
    case 'Kertas': return 'bg-yellow-100 border-yellow-200';
    case 'Logam': return 'bg-gray-100 border-gray-200';
    case 'B3': return 'bg-red-100 border-red-200';
    default: return 'bg-gray-100 border-gray-200';
  }
};

const getCategoryTextColor = (category: string | null) => {
    switch (category) {
      case 'Organik': return 'text-green-800';
      case 'Plastik': return 'text-blue-800';
      case 'Kertas': return 'text-yellow-800';
      case 'Logam': return 'text-gray-800';
      case 'B3': return 'text-red-800';
      default: return 'text-gray-800';
    }
};

export const WasteCard: React.FC<WasteCardProps> = ({ result }) => {
  if (!result.is_sampah) {
    return (
      <View className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center">
        <Info size={48} color="#f87171" style={{ marginBottom: 12 }} />
        <Text className="text-lg font-bold text-red-800">Bukan Sampah</Text>
        <Text className="text-red-600 text-sm mt-1 text-center">
          Objek pada gambar tidak terdeteksi sebagai sampah yang dapat diklasifikasikan.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl shadow-sm overflow-hidden border border-emerald-100">
      <View className={`p-4 flex-row items-center gap-3 border-b ${getCategoryColor(result.kategori_sampah)}`}>
          <View className="p-2 bg-white/50 rounded-full">
            {getCategoryIcon(result.kategori_sampah)}
          </View>
          <View>
            <Text className="text-xs font-semibold opacity-70 uppercase tracking-wider text-gray-700">Kategori</Text>
            <Text className={`text-xl font-bold ${getCategoryTextColor(result.kategori_sampah)}`}>
                {result.kategori_sampah || 'Tidak Diketahui'}
            </Text>
          </View>
      </View>

      <View className="p-6 space-y-6">
        <View className="flex-row items-start gap-4">
          <View className="p-3 bg-emerald-50 rounded-full">
            <DollarSign size={24} color="#059669" />
          </View>
          <View>
            <Text className="text-sm text-gray-500 font-medium">Estimasi Harga Jual</Text>
            <Text className="text-2xl font-bold text-emerald-700">
              {result.estimasi_harga_jual_rp_per_kg 
                ? `Rp ${result.estimasi_harga_jual_rp_per_kg.toLocaleString('id-ID')} /kg`
                : 'Tidak bernilai jual'}
            </Text>
          </View>
        </View>

        <View className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <View className="flex-row items-center gap-2 mb-2">
            <Info size={16} color="#6b7280" /> 
            <Text className="text-sm text-gray-500 font-medium">Saran Pengolahan</Text>
          </View>
          <Text className="text-gray-700 italic leading-6">
            "{result.saran_pengolahan}"
          </Text>
        </View>
      </View>
    </View>
  );
};