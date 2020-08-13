import React from "react";
import { View, TextInput, Button, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Container from "../components/Container";
import Colors from "../constants/Colors";
import CustomTextInput from "../components/CustomTextInput";
import CustomText from "./CustomText";

const CustomModal = (props) => {
    const darkMode = useSelector((state) => state.goals.darkMode);

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <Container style={styles.inputContainer}>
                <CustomText style={styles.title}>{props.title}</CustomText>
                <CustomTextInput
                    style={styles.input}
                    onChangeText={props.inputHandler}
                    value={props.value}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="CANCEL"
                            color="red"
                            onPress={props.cancelHandler}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={props.submitHandler} />
                    </View>
                </View>
            </Container>
        </Modal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: "bold",
    },
    input: {
        borderBottomWidth: 2,
        padding: 5,
        width: "80%",
        marginBottom: 10,
        fontSize: 25,
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-between",
    },
    button: {
        width: 100,
    },
});

export default CustomModal;
