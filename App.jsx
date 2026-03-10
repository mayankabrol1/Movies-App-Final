import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";

import "./global.css";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}


