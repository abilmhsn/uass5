import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Leaf, ArrowRight, Lock, Mail } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      login();
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-emerald-50"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="items-center mb-10">
            <View className="bg-emerald-600 p-4 rounded-2xl shadow-lg mb-6">
                <Leaf size={40} color="white" />
            </View>
            <Text className="text-3xl font-extrabold text-gray-900">
            PeduliSampah
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-600">
            Masuk untuk mulai memilah sampahmu
            </Text>
        </View>

        <View className="space-y-6 w-full max-w-sm mx-auto">
          <View>
            <Text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Email</Text>
            <View className="relative flex-row items-center">
              <View className="absolute left-3 z-10">
                <Mail size={20} color="#9ca3af" />
              </View>
              <TextInput
                className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 shadow-sm focus:border-emerald-600"
                placeholder="nama@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View>
            <Text className="block text-sm font-medium leading-6 text-gray-900 mb-2">Password</Text>
            <View className="relative flex-row items-center">
              <View className="absolute left-3 z-10">
                <Lock size={20} color="#9ca3af" />
              </View>
              <TextInput
                className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-3 text-gray-900 shadow-sm focus:border-emerald-600"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="flex-row w-full justify-center rounded-lg bg-emerald-600 px-3 py-3 items-center shadow-sm"
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-sm font-semibold text-white mr-2">Masuk</Text>
                <ArrowRight size={16} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-10 flex-row justify-center">
          <Text className="text-sm text-gray-500">Belum punya akun? </Text>
          <TouchableOpacity>
            <Text className="text-sm font-semibold text-emerald-600">Daftar Gratis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;