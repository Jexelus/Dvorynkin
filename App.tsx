import "react-native-gesture-handler";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import SnakeGame from "./src/components/Game";



const App = () => (
    <GestureHandlerRootView style={{ flex:1 }}>
      <SnakeGame/>
    </GestureHandlerRootView>
);

export default App;