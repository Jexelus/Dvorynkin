import {StyleSheet, TouchableOpacity, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
import {Colors} from "../styles/colors";

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: JSX.Element;
    isPaused: boolean;
}

export default function Header ({
    reloadGame,
    pauseGame,
    children,
    isPaused
}:HeaderProps):JSX.Element {
    return (
        <View style={syles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={35} color={Colors.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome name={isPaused ? 'play-circle':"pause-circle"}
                size={35}
                color={Colors.primary}/>
            </TouchableOpacity>
            {children}
        </View>
    );
}
const syles = StyleSheet.create({
    container:{
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 30,
        backgroundColor: Colors.background
    }
})