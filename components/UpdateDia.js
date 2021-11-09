import React from "react";
import {
  Modal,
  Portal,
  Text,
  RadioButton,
  Provider,
  TextInput,
  Title,
  Button,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";

export default function UpdateDia({
  setIsPressed,
  isPressed,
  selectedRow,
  handleUpdate,
}) {
  const [checked, setChecked] = React.useState("average");
  const [text, setText] = React.useState("");

  const containerStyle = { backgroundColor: "white", padding: 20 };

  // https://github.com/callstack/react-native-paper/issues/706
  return (
    <Provider>
      <Portal>
        <Modal
          visible={isPressed}
          onDismiss={() => setIsPressed(false)}
          contentContainerStyle={containerStyle}
        >
          <Title style={styles.title}>Update {selectedRow}</Title>
          <View style={styles.row}>
            <RadioButton
              value="average"
              status={checked === "average" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("average");
              }}
            />
            <Text style={styles.text}>Average Price</Text>
            <RadioButton
              value="units"
              status={checked === "units" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("units");
              }}
            />
            <Text style={styles.text}>Number of Unit</Text>
          </View>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={() => {
                handleUpdate({ type: checked, input: text });
                setIsPressed(false)
            }}
            style={styles.button}
          >
            Submit
          </Button>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  row: {
    //flex: 1,
    flexDirection: "row",
  },
  text: {
    marginTop: 6,
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: 5,
  },
});
