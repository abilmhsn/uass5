import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowRight, Recycle, TrendingUp, MapPin } from 'lucide-react-native';
import { ScreenName } from '../types/WasteResult';

interface HomeScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-emerald-600 pb-8 pt-4 px-6 rounded-b-[40px] shadow-lg mb-6 relative overflow-hidden">
            <View className="absolute top-0 right-0 p-4 opacity-10">
                <Recycle size={180} color="white" />
            </View>
            <View>
                <View className="flex-row items-center gap-3 mb-6">
                    <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/30">
                        <Text className="font-bold text-lg text-white">PS</Text>
                    </View>
                    <Text className="text-2xl font-bold text-white">Halo, Sobat!</Text>
                </View>
                
                <View className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <Text className="text-emerald-50 text-sm mb-1">Saldo Sampah Anda</Text>
                    <Text className="text-3xl font-bold text-white">Rp 45.200</Text>
                    <View className="mt-3 flex-row items-center gap-2 bg-emerald-700/50 self-start px-2 py-1 rounded-lg">
                        <TrendingUp size={12} color="#d1fae5" />
                        <Text className="text-xs text-emerald-100">+Rp 12.500 minggu ini</Text>
                    </View>
                </View>
            </View>
        </View>

        <View className="px-6 space-y-6">
            {/* Quick Actions */}
            <View>
                <Text className="font-bold text-gray-800 mb-3 text-lg">Aktivitas</Text>
                <View className="flex-row gap-4">
                    <TouchableOpacity 
                        onPress={() => onNavigate('Scan')}
                        className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center gap-2"
                    >
                        <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center">
                            <Recycle size={24} color="#059669" />
                        </View>
                        <Text className="font-medium text-gray-700">Scan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => onNavigate('Map')}
                        className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 items-center gap-2"
                    >
                        <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                            <MapPin size={24} color="#2563eb" />
                        </View>
                        <Text className="font-medium text-gray-700">Lokasi</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Recent History Preview */}
            <View>
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="font-bold text-gray-800 text-lg">Riwayat Terakhir</Text>
                    <TouchableOpacity 
                        onPress={() => onNavigate('History')}
                        className="flex-row items-center gap-1"
                    >
                        <Text className="text-sm text-emerald-600 font-medium">Lihat Semua</Text>
                        <ArrowRight size={12} color="#059669" />
                    </TouchableOpacity>
                </View>
                
                <View className="space-y-3">
                    {[
                        { type: 'Plastik', price: 2500, date: 'Hari ini', color: 'bg-blue-100', iconColor: '#2563eb' },
                        { type: 'Kertas', price: 1200, date: 'Kemarin', color: 'bg-yellow-100', iconColor: '#ca8a04' },
                        { type: 'Logam', price: 5000, date: '2 hari lalu', color: 'bg-gray-100', iconColor: '#4b5563' }
                    ].map((item, idx) => (
                        <View key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-3">
                            <View className="flex-row items-center gap-3">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${item.color}`}>
                                    <Recycle size={20} color={item.iconColor} />
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-800">{item.type}</Text>
                                    <Text className="text-xs text-gray-500">{item.date}</Text>
                                </View>
                            </View>
                            <Text className="font-bold text-emerald-600">+Rp {item.price}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Education Banner */}
            <View className="bg-emerald-600 rounded-2xl p-5 shadow-lg overflow-hidden mb-6">
                <Text className="font-bold text-lg mb-1 text-white">Tahukah Kamu?</Text>
                <Text className="text-sm text-white/90 leading-relaxed mb-3">
                    Botol plastik membutuhkan waktu hingga 450 tahun untuk terurai. Daur ulang sekarang!
                </Text>
                <TouchableOpacity className="bg-white self-start px-3 py-1.5 rounded-full">
                    <Text className="text-xs font-bold text-emerald-600">Pelajari Lebih Lanjut</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;