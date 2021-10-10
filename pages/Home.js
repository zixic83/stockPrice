import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FAB } from "react-native-paper";
import Item from "../components/Item";
import Dialogue from "../components/Dialogue";
import AddButton from "../components/AddButton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [codeList, setCodeList] = useState([
    "QAN",
    "MP1",
    "A2M",
    "VAS",
    "RIO",
    "VTS",
  ]);

  /*   const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(codeList);
      await AsyncStorage.setItem('codeList',jsonValue)
    } catch(e) {
      console.log('Error occured')
    }
  }

  
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("codeList");
    jsonValue != null ? JSON.parse(jsonValue) : null;
    setCodeList(jsonValue)
  } catch (e) {
    // error reading value
    console.log("Error occured");
  }
  }; */

  //useEffect(() => {getData()}, []);

  // https://www.codegrepper.com/code-examples/javascript/react+sort+array+alphabetically
  codeList.sort(function (a, b) {
    return a.localeCompare(b); //using String.prototype.localCompare()
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
  }, [refreshing]);

  const handleDelete = (key) => {
    setCodeList(codeList.filter((stock) => {
      if (stock !== key) {
        return stock
      }
    }))
  }

  const rightActions = (stock) => {
    return (
      
      <View style={sytles.rightActions}>
        <TouchableOpacity
          style={sytles.actionText}
          onPress={() => handleDelete(stock)}
        >
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  const loadData = (stock) => {
    if (update) {
      return (
        <Swipeable
          renderRightActions={()=>rightActions(stock)}
          key={stock}
        >
          <Item key={stock} code={stock} isUpdate={update} test={refreshing} />
        </Swipeable>
      );
    } else {
      return (<Swipeable renderRightActions={()=>rightActions(stock)}
          key={stock} ><Item key={stock} code={stock} /></Swipeable>);
    }
  };

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
      <AddButton setCodeList={setCodeList} codeList={codeList} />
    </>
  );
}

const sytles = StyleSheet.create({
  rightActions: {
    backgroundColor: "#a62c2a",
    justifyContent: "center",
    flex:0.15
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 6,
    marginLeft:9,
    backgroundColor: "#a62c2a",
  },
});

// https://geekscoders.com/courses/react-native/lessons/react-native-floating-action-button/
