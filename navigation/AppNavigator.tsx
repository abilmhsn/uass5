import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Home, Camera, Clock, Map } from 'lucide-react-native';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MapScreen from '../screens/MapScreen';
import { ScreenName } from '../types/WasteResult';

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');

  const navItems = [
    { name: 'Home', icon: Home, label: 'Beranda' },
    { name: 'Scan', icon: Camera, label: 'Scan' },
    { name: 'History', icon: Clock, label: 'Riwayat' },
    { name: 'Map', icon: Map, label: 'Lokasi' },
  ];

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        {currentScreen === 'Home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'Scan' && <ScanScreen />}
        {currentScreen === 'History' && <HistoryScreen />}
        {currentScreen === 'Map' && <MapScreen />}
      </View>

      <View className={`bg-white border-t border-gray-200 flex-row justify-between items-center px-6 py-2 pb-${Platform.OS === 'ios' ? '8' : '4'}`}>
        {navItems.map((item) => {
          const isActive = currentScreen === item.name;
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => setCurrentScreen(item.name as ScreenName)}
              className="items-center justify-center w-16 gap-1"
            >
              <View className={`p-2 rounded-full ${isActive ? 'bg-emerald-100' : 'bg-transparent'}`}>
                <Icon 
                    size={24} 
                    color={isActive ? '#059669' : '#9ca3af'} 
                    strokeWidth={isActive ? 2.5 : 2}
                />
              </View>
              <Text className={`text-[10px] font-medium ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};