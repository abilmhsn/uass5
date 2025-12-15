import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Camera, X, Loader2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { analyzeWasteImage } from '../services/geminiService';
import { WasteAnalysisResult } from '../types/WasteResult';
import { WasteCard } from '../components/WasteCard';

const ScanScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<WasteAnalysisResult | null>(null);

  const takePhoto = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Mohon izinkan akses kamera untuk menggunakan fitur ini.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0].base64) {
      // Create data URI for display
      const uri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(uri);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setIsAnalyzing(true);

    try {
      const base64Data = image.split(',')[1];
      const data = await analyzeWasteImage(base64Data);
      setResult(data);
    } catch (err) {
      Alert.alert('Error', 'Gagal menganalisis gambar. Periksa koneksi internet.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
       <View className="px-4 py-4 flex-row items-center justify-between bg-white shadow-sm z-10">
         <Text className="text-xl font-bold text-gray-800">Scan Sampah</Text>
         {image && (
             <TouchableOpacity onPress={resetScan}>
                 <Text className="text-sm font-medium text-gray-500">Reset</Text>
             </TouchableOpacity>
         )}
       </View>

      <View className="flex-1 p-4">
        {!image ? (
          <View className="flex-1 items-center justify-center space-y-6">
            <View className="items-center space-y-2 mb-6">
              <View className="bg-emerald-100 p-6 rounded-full mb-4">
                <Camera size={48} color="#059669" />
              </View>
              <Text className="text-xl font-semibold text-gray-900 text-center">Ambil Foto Sampah</Text>
              <Text className="text-gray-500 text-center max-w-[250px]">
                Foto sampahmu untuk mengetahui jenis, harga, dan cara pengolahannya.
              </Text>
            </View>

            <TouchableOpacity 
                onPress={takePhoto}
                className="flex-row items-center justify-center gap-2 bg-emerald-600 px-8 py-4 rounded-xl shadow-lg w-full max-w-xs"
            >
              <Camera size={20} color="white" />
              <Text className="text-white font-semibold text-lg">Ambil Foto</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="space-y-6">
            <View className="relative rounded-2xl overflow-hidden shadow-md aspect-square bg-black">
              <Image 
                source={{ uri: image }} 
                className="w-full h-full"
                resizeMode="contain"
              />
              {!result && !isAnalyzing && (
                 <TouchableOpacity 
                 onPress={resetScan}
                 className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
               >
                 <X size={20} color="white" />
               </TouchableOpacity>
              )}
            </View>

            {!result && (
              <TouchableOpacity
                onPress={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-4 bg-emerald-600 rounded-xl shadow-lg flex-row items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <ActivityIndicator color="white" />
                    <Text className="text-white font-bold text-lg">Menganalisis...</Text>
                  </>
                ) : (
                  <Text className="text-white font-bold text-lg">Identifikasi Sampah</Text>
                )}
              </TouchableOpacity>
            )}

            {result && (
              <View>
                <Text className="text-lg font-bold text-gray-900 mb-3">Hasil Analisis</Text>
                <WasteCard result={result} />
                
                <TouchableOpacity 
                  onPress={resetScan}
                  className="w-full mt-6 py-3 border-2 border-emerald-600 rounded-xl items-center"
                >
                  <Text className="text-emerald-700 font-semibold">Scan Lagi</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;