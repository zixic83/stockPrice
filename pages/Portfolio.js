import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { DataTable,IconButton } from "react-native-paper";
import PortfolioDia from "../components/PortfolioDia";
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
  }
];
export default function Portfolio({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(existingData);
  const [isVisible, setIsVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
    console.log("rerendered");
  }, [refreshing]);

  const addStock = () => {
    setIsVisible(true);
  }

  const setDia = () => {
    setIsVisible(false)
  }

  const handleSubmit = (input) => {
    data.push(input)
    setIsVisible(false)
    //console.log(data)
  };
  
  const handleDelete = (removedStock) => {
    const newList = data.filter(stock => {
      return removedStock.code != stock.code
    })

    setData(newList);
    console.log(data)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          size={28}
          onPress={addStock}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
      >
        <ProfolioPie data={data} key={data}/>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Code</DataTable.Title>
            <DataTable.Title numeric>Avg Price</DataTable.Title>
            <DataTable.Title numeric>Earning</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
            <DataTable.Title numeric>Change</DataTable.Title>
          </DataTable.Header>
          <ScrollView nestedScrollEnabled={true}>
            {data.map((stock) => {
              return <TableRow stock={stock} handleDelete={handleDelete} key={stock.code}></TableRow>;
            })}
          </ScrollView>
        </DataTable>
      </ScrollView>
      <PortfolioDia
        isVisible={isVisible}
        setDia={setDia}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  table: {
    height: 290,
  },
  title: {
    fontSize: 24,
  },
});
