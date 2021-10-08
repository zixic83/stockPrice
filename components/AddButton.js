import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import Dialogue from "../components/Dialogue";

export default function AddButton({ setCodeList,codeList }) {
    const [showDia, setShowDia] = useState(false);
      const resetDia = () => {
        setShowDia(false);
      };

      const handleSubmit = (code) => {
        setCodeList([...codeList, code]);
      };
  return (
    <>
      <FAB
        icon="plus"
        onPress={() => {
          setShowDia(true)
        }}
        style={styles.fab}
      />
      <Dialogue
        isVisible={showDia}
        resetDia={resetDia}
        handleSubmit={handleSubmit}
      />
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
