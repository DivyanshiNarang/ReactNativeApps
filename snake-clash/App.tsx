import { SafeAreaProvider } from 'react-native-safe-area-context';
import Game from './src/components/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Game />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
