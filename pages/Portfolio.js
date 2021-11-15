import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import PortfolioDia1 from "../components/PortfolioDia1";
import ProfolioPie from "../components/ProfolioPie";
import TableRow from "../components/TableRow";
import axios from "axios";
import UpdateDia from "../components/UpdateDia";

export default function Portfolio({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
    console.log("rerendered");
  }, [refreshing]);

  const setDia = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (input) => {
    let isDuplicate = false;
    data.forEach((ele) => {
      if (ele.code === input.code) {
        isDuplicate = true
      }
    })
    if (isDuplicate) {
      alert(`${input.code} is already in the portfolio`)
    } else {
      data.push(input);
    try {
      const res = await axios.post(
        "http://192.168.0.78:5000/api/v1/portfolio",
        input
      );
    } catch (error) {
      console.log(error);
    }
    }
    
    setIsVisible(false);
  };

  const handleDelete = (removedStock) => {
    const newList = data.filter((stock) => {
      return removedStock.code != stock.code;
    });

    setData(newList);
    try {
      axios.delete("http://192.168.0.78:5000/api/v1/portfolio", {
        data: {
          code: removedStock.code,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (updateValue) => {
    const updatedData = data.map((stock) => {
      if (updateValue.type === "average") {
        if (stock.code === selectedRow) {
          try {
            axios.patch("http://192.168.0.78:5000/api/v1/portfolio", {
              ...stock,
              avgPrice: parseFloat(updateValue.input),
            });
          } catch (error) {
            console.log(error);
          }
        }
        return stock.code === selectedRow
          ? { ...stock, avgPrice: parseFloat(updateValue.input) }
          : stock;
      } else {
        if (stock.code === selectedRow) {
          try {
            axios.patch("http://192.168.0.78:5000/api/v1/portfolio", {
              ...stock,
              units: parseFloat(updateValue.input),
            });
          } catch (error) {
            console.log(error);
          }
        }
        return stock.code === selectedRow
          ? { ...stock, units: parseFloat(updateValue.input) }
          : stock;
      }
    });

    setData(updatedData);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="plus"
          size={28}
          onPress={() => {
            setIsVisible(true);
          }}
        />
      ),
    });
  }, [navigation]);

  const getCodeList = async () => {
    try {
      const result = await axios.get(
        "http://192.168.0.78:5000/api/v1/portfolio"
      );

      setData(result.data.stocks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCodeList();
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfolioPie data={data} key={data} />
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
              return (
                <TableRow
                  stock={stock}
                  handleDelete={handleDelete}
                  setIsPressed={setIsPressed}
                  setSelectedRow={setSelectedRow}
                  key={stock.code}
                  setData = {setData}
                ></TableRow>
              );
            })}
          </ScrollView>
        </DataTable>
      </ScrollView>
      <PortfolioDia1
        isVisible={isVisible}
        setDia={setDia}
        handleSubmit={handleSubmit}
      />
      <UpdateDia
        setIsPressed={setIsPressed}
        isPressed={isPressed}
        selectedRow={selectedRow}
        handleUpdate={handleUpdate}
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
