import React, { useState } from "react";
import {
  Modal,
  Portal,
  Button,
  TextInput,
  Provider,
  Headline,
} from "react-native-paper";
import { StyleSheet } from "react-native";

export default function PortfolioDia({ isVisible, setDia, handleSubmit }) {
  //const [visible, setVisible] = React.useState(false);
  const [code, setCode] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [units, setUnits] = useState("");

  const hideModal = () => setDia();
  // https://dev.to/raphaelchaula/how-to-update-object-or-array-state-in-react-4cma
  return (
    <Provider>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Headline style={styles.headline}>Add new Stock</Headline>
          <TextInput
            label="Stock Code"
            value={code}
            onChangeText={(userInput) => {
              setCode(userInput);
            }}
            style={styles.inputBox}
          />
          <TextInput
            label="Average Price"
            value={avgPrice}
            onChangeText={(userInput) => {
              setAvgPrice(userInput);
            }}
            style={styles.inputBox}
          />
          <TextInput
            label="Number of Units"
            value={units}
            onChangeText={(userInput) => {
              setUnits(userInput);
            }}
            style={styles.inputBox}
          />
          <Button
            mode="contained"
            onPress={() => {
              //console.log(input);
              handleSubmit({code:code,avgPrice:parseFloat(avgPrice),units:parseInt(units)});
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
  inputBox: {
    margin: 5,
  },
  headline: {
    textAlign: "center",
  },
  button: {
    marginTop: 5,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
  },
});
