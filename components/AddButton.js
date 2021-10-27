import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { Alert, StyleSheet } from "react-native";
import Dialogue from "../components/Dialogue";
import Feedback from "./Feedback";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddButton({ setCodeList, codeList }) {
  const [showDia, setShowDia] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

/*   const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(codeList);
      await AsyncStorage.setItem("codeList", jsonValue);
    } catch (e) {
      console.log("Error occured");
    }}; */

    const resetDia = () => {
      setShowDia(false);
    };

    const handleSubmit = (code) => {
      setCodeList([...codeList, code.toUpperCase()]);
      setShowFeedback(true);
      //saveData();
      setShowDia(false)
      Alert.alert('','New stock added')
    };
  
  return (
    <>
      <FAB
        icon="plus"
        onPress={() => {
          setShowDia(true);
        }}
        style={styles.fab}
      />
      <Dialogue
        isVisible={showDia}
        resetDia={resetDia}
        handleSubmit={handleSubmit}
      />
      {/* {showFeedback?<Feedback/>:null} */}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgba(245, 40, 145, 1)",
  },
});
