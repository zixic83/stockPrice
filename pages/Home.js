import React, { useState, useEffect,useCallback,useMemo,memo } from "react";
import { View, ScrollView, StyleSheet, RefreshControl,Text } from "react-native";
import { FAB } from "react-native-paper";
import Item from "../components/Item";
import Dialogue from "../components/Dialogue";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [showDia, setShowDia] = useState(false);
  const [codeList, setCodeList] = useState([
    "QAN",
    "NAB",
    "CBA",
    "MP1",
    "ANZ",
    "COL",
    "APA",
    "A2M",
    "WOW",
    "4DX",
    "CMW",
    "VAS",
  ]);

  // https://www.codegrepper.com/code-examples/javascript/react+sort+array+alphabetically
  codeList.sort(function (a, b) {
    return a.localeCompare(b); //using String.prototype.localCompare()
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
  },[refreshing]);

  const loadData =(stock) => {
    if (update) {
      return <Item key={stock} code={stock} isUpdate={update} test={refreshing}/>;
    } else {
      return <Item key={stock} code={stock} />;
    }
  }

  const resetDia = () => {
    setShowDia(false)
  }

  const handleSubmit = (code) => {
    setCodeList([...codeList,code])
  }


  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {codeList.map((stock) => {
          {
            return loadData(stock);
          }
        })}
      </ScrollView>
      <FAB
        icon="plus"
        onPress={useCallback(() => { setShowDia(true)}, [refreshing])}
        style={styles.fab}
      />
      <Dialogue isVisible={showDia} resetDia={resetDia} handleSubmit={handleSubmit}/>
    </>
  );
}

// https://geekscoders.com/courses/react-native/lessons/react-native-floating-action-button/
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
