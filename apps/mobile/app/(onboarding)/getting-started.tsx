import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GettingStartedScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6 py-8">
        <View className="flex-1 items-center justify-center">
          <View className="mb-8 items-center">
            <Image
              source={require('../../assets/adaptive-icon.png')}
              className="h-48 w-48"
              resizeMode="contain"
            />
          </View>

          <Text className="mb-4 px-4 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Learn Smarter with <Text className="text-orange-500">Blob</Text>
          </Text>

          <Text className="px-4 text-center text-base leading-6 text-gray-500">
            Your AI-powered study companion. Transform notes into interactive flashcards and quizzes
            instantly.
          </Text>
        </View>

        <View>
          <Pressable
            className="mb-4 h-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-200 active:bg-orange-600"
            onPress={() => router.push('/(onboarding)/login')}>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-white">Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </Pressable>

          <Text className="text-center text-xs text-gray-400">
            By continuing, you agree to our Terms and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
