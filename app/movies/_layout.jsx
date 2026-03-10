import { Stack } from "expo-router";
import ProfileMenuButton from "../../components/UI/ProfileMenuButton";

export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitle: "Back to List",
        headerRight: () => <ProfileMenuButton />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details/[mediaType]/[id]" options={{ title: "Details" }} />
    </Stack>
  );
}


