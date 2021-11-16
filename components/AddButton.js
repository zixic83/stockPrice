import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { Alert, StyleSheet } from "react-native";
import Dialogue from "../components/Dialogue";
import axios from "axios";

export default function AddButton({ setCodeList, codeList }) {
  const [showDia, setShowDia] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const resetDia = () => {
    setShowDia(false);
  };

  const updateList = async (code) => {
    // send POST request to back end
    try {
      const res = await axios.post("http://192.168.0.78:5000/api/v1/codeList", {
        code: code,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (code) => {
   
    const test = codeList.map(
      (ele) => ele.toLowerCase() === code.toLowerCase()
    );
     console.log(test)
    if (test.includes(true)) {
      alert(`${code.toUpperCase()} is already in the list`);
      setShowDia(false);
    } else {
      setCodeList([...codeList, code.toUpperCase()]);
      updateList(code.toUpperCase());
      setShowFeedback(true);
      setShowDia(false);
    }
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
    backgroundColor: "#233C67",
  },
});
