import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react-native';

const MapScreen: React.FC = () => {
  // Mock Waste Banks
  const wasteBanks = [
    { id: 1, name: "Bank Sampah Bersih Jaya", distance: "0.5 km", address: "Jl. Merpati No. 12", open: "08:00 - 16:00", rating: 4.8 },
    { id: 2, name: "Peduli Lingkungan Unit 4", distance: "1.2 km", address: "Jl. Sudirman Blok B", open: "09:00 - 15:00", rating: 4.5 },
    { id: 3, name: "Recycle Point Center", distance: "2.8 km", address: "Komp. Griya Asri", open: "08:00 - 17:00", rating: 4.9 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 relative">
            {/* Mock Map Background */}
            <View className="absolute inset-0 bg-gray-200 items-center justify-center opacity-50">
                <Text className="text-gray-400 font-bold text-lg">Map View Placeholder</Text>
            </View>

            {/* Overlay Content */}
            <View className="flex-1">
                <View className="bg-white/90 px-6 py-4 shadow-sm">
                    <Text className="text-xl font-bold text-gray-800">Bank Sampah Terdekat</Text>
                    <Text className="text-xs text-gray-500">Menampilkan lokasi penerimaan sampah daur ulang</Text>
                </View>
                
                <View className="flex-1" />

                {/* Bottom List */}
                <View className="bg-white rounded-t-3xl shadow-lg h-[60%]">
                    <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center mt-3 mb-2" />
                    
                    <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                        {wasteBanks.map(bank => (
                            <View key={bank.id} className="border border-gray-100 rounded-xl p-4 mb-4 bg-white">
                                <View className="flex-row justify-between items-start mb-2">
                                    <View className="flex-1 mr-2">
                                        <Text className="font-bold text-gray-800 text-base">{bank.name}</Text>
                                        <View className="flex-row items-center gap-1 mt-1">
                                            <MapPin size={12} color="#6b7280" />
                                            <Text className="text-xs text-gray-500">{bank.address}</Text>
                                        </View>
                                    </View>
                                    <View className="bg-emerald-100 px-2 py-1 rounded-lg">
                                        <Text className="text-xs font-bold text-emerald-700">{bank.distance}</Text>
                                    </View>
                                </View>
                                
                                <View className="flex-row items-center gap-4 my-3">
                                    <View className="flex-row items-center gap-1">
                                        <Clock size={12} color="#4b5563" /> 
                                        <Text className="text-xs text-gray-600">{bank.open}</Text>
                                    </View>
                                    <Text className="text-xs font-medium text-yellow-600">★ {bank.rating}</Text>
                                </View>

                                <View className="flex-row gap-2 mt-2">
                                    <TouchableOpacity className="flex-1 bg-emerald-600 py-2 rounded-lg flex-row items-center justify-center gap-1">
                                        <Navigation size={12} color="white" /> 
                                        <Text className="text-white text-xs font-bold">Rute</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="flex-1 border border-gray-200 py-2 rounded-lg flex-row items-center justify-center gap-1">
                                        <Phone size={12} color="#374151" /> 
                                        <Text className="text-gray-700 text-xs font-bold">Hubungi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
};

export default MapScreen;