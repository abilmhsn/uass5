import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { HistoryItemType } from '../types/WasteResult';

interface HistoryItemProps {
  item: HistoryItemType;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const typeName = item.type;
  const isPlastik = typeName.includes('Plastik');
  const isKertas = typeName.includes('Kertas');
  const isLogam = typeName.includes('Logam');

  let colorClass = 'bg-green-100';
  let textColorClass = 'text-green-700';
  
  if (isPlastik) { colorClass = 'bg-blue-100'; textColorClass = 'text-blue-700'; }
  else if (isKertas) { colorClass = 'bg-yellow-100'; textColorClass = 'text-yellow-700'; }
  else if (isLogam) { colorClass = 'bg-gray-100'; textColorClass = 'text-gray-700'; }

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-col gap-3 mb-3">
      <View className="flex-row justify-between items-start">
        <View>
          <View className={`self-start px-2 py-1 rounded-full ${colorClass}`}>
            <Text className={`text-xs font-medium ${textColorClass}`}>
                {typeName.split(' ')[0]}
            </Text>
          </View>
          <Text className="font-bold text-gray-800 mt-2 text-base">{typeName}</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-bold text-emerald-600">Rp {item.price.toLocaleString('id-ID')}</Text>
          <Text className="text-xs text-gray-400 mt-1">{item.amount}</Text>
        </View>
      </View>
      
      <View className="pt-3 border-t border-gray-50 flex-row justify-between items-center">
        <View className="flex-row items-center gap-1">
          <Calendar size={12} color="#9ca3af" />
          <Text className="text-gray-400 text-xs">{item.date}</Text>
        </View>
        <View className={`px-2 py-0.5 rounded ${item.status === 'Dijual' ? 'bg-emerald-50' : 'bg-orange-50'}`}>
             <Text className={`text-xs ${item.status === 'Dijual' ? 'text-emerald-600' : 'text-orange-600'}`}>
                {item.status}
             </Text>
        </View>
      </View>
    </View>
  );
};