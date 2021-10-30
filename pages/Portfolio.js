import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { DataTable } from "react-native-paper";
import ProfolioPie from "../components/ProfolioPie";

import TableRow from "../components/TableRow";

const existingData = [
  {
    code: "A2M",
    avgPrice: 11.62,
    units: 353,
  },
  {
    code: "MP1",
    avgPrice: 12.6091,
    units: 353,
  },
  {
    code: "QAN",
    avgPrice: 2.6275,
    units: 1827,
  },
  {
    code: "RIO",
    avgPrice: 98.19,
    units: 49,
  },
  {
    code: "VAS",
    avgPrice: 68.9193,
    units: 363,
  },
];
export default function Portfolio() {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
    console.log("rerendered");
  }, [refreshing]);
  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfolioPie data={existingData} />
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Code</DataTable.Title>
            <DataTable.Title numeric>Avg Price</DataTable.Title>
            <DataTable.Title numeric>Earning</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
            <DataTable.Title numeric>Change</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {existingData.map((stock) => {
              return <TableRow stock={stock} key={stock.code}></TableRow>;
            })}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    height: 300,
  },
  title: {
    fontSize: 24,
  },
});
