import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="details"
      options={{
        title: 'Details',
        headerBackButtonDisplayMode: 'minimal',
        presentation: 'formSheet',
        sheetAllowedDetents: [0.3, 0.6, 0.9],
        sheetGrabberVisible: true
        // animation: "slide_from_bottom",
      }} />
  </Stack>;
}
