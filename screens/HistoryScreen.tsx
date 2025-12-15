import React from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Search } from 'lucide-react-native';
import { HistoryItem } from '../components/HistoryItem';
import { HistoryItemType } from '../types/WasteResult';

const HistoryScreen: React.FC = () => {
  // Mock Data
  const history: HistoryItemType[] = [
    { id: 1, type: 'Plastik (Botol PET)', date: '20 Okt 2023', amount: '0.5 kg', price: 2500, status: 'Dijual' },
    { id: 2, type: 'Kertas (Kardus)', date: '19 Okt 2023', amount: '2.0 kg', price: 4000, status: 'Menunggu' },
    { id: 3, type: 'Logam (Kaleng)', date: '15 Okt 2023', amount: '0.2 kg', price: 1500, status: 'Dijual' },
    { id: 4, type: 'Organik', date: '12 Okt 2023', amount: '1.0 kg', price: 0, status: 'Kompos Sendiri' },
    { id: 5, type: 'Plastik (Cup)', date: '10 Okt 2023', amount: '0.3 kg', price: 900, status: 'Dijual' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 py-4 shadow-sm z-10">
        <Text className="text-xl font-bold text-gray-800 mb-4">Riwayat</Text>
        <View className="relative justify-center">
            <View className="absolute left-3 z-10">
                <Search size={16} color="#9ca3af" />
            </View>
            <TextInput 
                placeholder="Cari riwayat..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm"
            />
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HistoryItem item={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;