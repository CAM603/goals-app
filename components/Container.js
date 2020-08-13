import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const Container = (props) => {
    const darkMode = useSelector((state) => state.goals.darkMode);

    return (
        <View
            style={[
                {
                    backgroundColor: darkMode
                        ? Colors.dark.bg
                        : Colors.light.bg,
                },
                props.style,
            ]}
        >
            {props.children}
        </View>
    );
};

export default Container;
