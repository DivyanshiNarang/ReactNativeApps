import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: 'Pokémons', headerTitleStyle: { color: 'green' } }} />
    <Stack.Screen name="details"
      options={{
        title: 'Details',
        headerBackButtonDisplayMode: 'minimal',
        presentation: 'formSheet',
        sheetAllowedDetents: [0.3, 0.6, 0.9],
        sheetGrabberVisible: true,
        sheetCornerRadius: 10,
        // animation: "slide_from_bottom",
      }} />
  </Stack>;
}
