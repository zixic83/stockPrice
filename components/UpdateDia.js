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
  HelperText,
  Surface,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const formSchema = yup.object({
  text: yup
    .number()
    .required()
    .test("not-negative", "Unit must be greater than 0", (val) => {
      return parseFloat(val) > 0;
    }),
});

export default function UpdateDia({
  setIsPressed,
  isPressed,
  selectedRow,
  handleUpdate,
}) {
  const [checked, setChecked] = React.useState("average");
  const [text, setText] = React.useState("");

  const containerStyle = { backgroundColor: "rgba(0,0,0,0)", padding: 20 };

  // https://github.com/callstack/react-native-paper/issues/706
  return (
    <Provider>
      <Portal>
        <Modal
          visible={isPressed}
          onDismiss={() => setIsPressed(false)}
          contentContainerStyle={containerStyle}
        >
          <Surface style={styles.row}>
          <Title style={styles.title}>Update {selectedRow}</Title>
          <Formik
            initialValues={{ text: "" }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              handleUpdate({ type: checked, input: values.text });
              setIsPressed(false);
            }}
          >
            
              {(props) => (
                <>
                  <View style={styles.options}>
                  <RadioButton
                    value="average"
                    status={checked === "average" ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked("average");
                    }}
                    color="#224E9C"
                  />
                  <Text style={styles.text}>Average Price</Text>
                  <RadioButton
                    value="units"
                    status={checked === "units" ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked("units");
                    }}
                    color="#224E9C"
                  />
                  
                  <Text style={styles.text}>Number of Unit</Text>
</View>
                  <TextInput
                    value={props.values.text}
                    onChangeText={props.handleChange("text")}
                    mode="outlined"
                    theme={{ colors: { primary: "#728CA8" } }}
                  />
                  <HelperText type="error">
                    {props.touched.text && props.errors.text}
                  </HelperText>
                  <Button
                    mode="contained"
                    onPress={props.handleSubmit}
                    style={styles.button}
                  >
                    Submit
                  </Button>
                </>
              )}
            
          </Formik>
          </Surface>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 13,
    justifyContent: "center",
    elevation: 8,
    borderRadius: 10,
    backgroundColor: "#F6F8FB",
  },
  text: {
    marginTop: 6,
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#3056A1",
  },
  textInput: {
    backgroundColor: "#728CA8",
  },
  options: {
    flexDirection: "row",
  }
});
