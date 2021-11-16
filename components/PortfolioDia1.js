import React, { useState } from "react";
import {
  Modal,
  Portal,
  Button,
  TextInput,
  Provider,
  Headline,
  HelperText,
  Surface
} from "react-native-paper";
import { StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';

const formSchema = yup.object({
  code: yup.string().required().max(3),
  avgPrice: yup.number().required().test('not-negative', 'Average price must be greater than 0',
  (val)=>{return parseFloat(val) > 0}),
  units:yup.number().required().test('not-negative', 'Unit must be greater than 0',
  (val)=>{return parseFloat(val) > 0})
})

export default function PortfolioDia1({ isVisible, setDia, handleSubmit }) {

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
          <Surface style={styles.surface} >
            <Headline style={styles.headline}>Add New Stock</Headline>
            <Formik
              initialValues={{ code: "", avgPrice: "", units: "" }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                handleSubmit({
                  code: values.code.toUpperCase(),
                  avgPrice: parseFloat(values.avgPrice),
                  units: parseInt(values.units),
                });
              }}
            >
              {(props) => (
                <>
                  <TextInput
                    label="Stock Code"
                    value={props.values.code}
                    onChangeText={props.handleChange("code")}
                    style={styles.inputBox}
                    mode="outlined"
                  />
                  <HelperText type="error">
                    {props.touched.code && props.errors.code}
                  </HelperText>
                  <TextInput
                    label="Average Price"
                    value={props.values.avgPrice}
                    onChangeText={props.handleChange("avgPrice")}
                    style={styles.inputBox}
                    keyboardType="phone-pad"
                    mode="outlined"
                  />
                  <HelperText type="error">
                    {props.touched.avgPrice && props.errors.avgPrice}
                  </HelperText>
                  <TextInput
                    label="Number of Units"
                    value={props.values.units}
                    onChangeText={props.handleChange("units")}
                    style={styles.inputBox}
                    keyboardType="phone-pad"
                    mode="outlined"
                  />
                  <HelperText type="error">
                    {props.touched.units && props.errors.units}
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
  inputBox: {
    margin: 5,
    backgroundColor: "#fff",
  },
  headline: {
    textAlign: "center",
    color: "#123B65",
    fontWeight: "bold",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#3056A1",
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0)",
    padding: 20,
  },
  surface: {
    padding: 13,
    justifyContent: "center",
    elevation: 8,
    borderRadius: 10,
    backgroundColor: "#F6F8FB",
  },
});
