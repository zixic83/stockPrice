import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Text, StyleSheet,TouchableOpacity,View } from "react-native";
import Axios from "axios";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import UpdateDia from "./UpdateDia";


export default function TableRow({ stock, handleDelete, setIsPressed, setSelectedRow }) {
  const [data, setData] = useState("");

  const baseUrl = `https://www.asx.com.au/asx/1/share/${stock.code}`;

  const shareData = () => {
    Axios.get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("not found");
      });
  };

  useEffect(() => {
    shareData();
  }, []);

  let earning = (
    ((parseFloat(data.last_price) - stock.avgPrice) / stock.avgPrice) *
    100
  ).toFixed(2);

  const rightActions = (stock) => {
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={[styles.actionText]}
          onPress={() => handleDelete(stock)}
        >
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const pressToEdit = () => {
    setIsPressed(true);
    setSelectedRow(stock.code)
  };

  return (
    <>
      <Swipeable
        renderRightActions={() => rightActions(stock)}
        key={stock.code}
      >
        <DataTable.Row onPress={pressToEdit}>
          <DataTable.Cell>{stock.code}</DataTable.Cell>
          <DataTable.Cell numeric>{stock.avgPrice}</DataTable.Cell>
          <DataTable.Cell numeric>
            <Text
              style={
                data === "" ? null : { color: earning >= 0 ? "green" : "red" }
              }
            >
              {earning}%
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.last_price}</DataTable.Cell>
          <DataTable.Cell numeric>
            <Text
              style={
                data === ""
                  ? null
                  : {
                      color:
                        data.change_in_percent.slice(0, -1) >= 0
                          ? "green"
                          : "red",
                    }
              }
            >
              {data.change_in_percent}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
      </Swipeable>
    </>
  );
}

const styles = StyleSheet.create({
  price: {
    marginTop: 10,
    paddingRight: 5,
  },
  rightActions: {
    backgroundColor: "#a62c2a",
    justifyContent: "center",
    flex: 0.15,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    padding: 6,
    marginLeft: 9,
    backgroundColor: "#a62c2a",
  },
});


