import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAppState } from "../lib/app-state";

export default function Index() {
  const { isReady, currentUser } = useAppState();

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  if (!currentUser) return <Redirect href="/login" />;
  if (!currentUser.profileComplete) return <Redirect href="/complete-profile" />;
  return <Redirect href="/movies" />;
}


