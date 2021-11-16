import React, { useState, useEffect, useCallback} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import Item from "../components/Item";
import AddButton from "../components/AddButton";
import axios from "axios";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [codeList, setCodeList] = useState([]);

  const getCodeList = async() => {
    try {
      const result = await axios.get(
        "http://192.168.0.78:5000/api/v1/codeList"
      );
      
      const prevList = result.data.stocks.map(stock => {
        return stock.code
      })
      setCodeList(prevList);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCodeList()
},[])

  // https://www.codegrepper.com/code-examples/javascript/react+sort+array+alphabetically
  codeList.sort(function (a, b) {
    return a.localeCompare(b); //using String.prototype.localCompare()
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setUpdate(!update);
    setRefreshing(false);
  }, [refreshing]);

    const updateList = async (code) => {
      // send DELETE request to back end
      try {
        axios.delete("http://192.168.0.78:5000/api/v1/codeList", {
          data: {
            code:code,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete = (key) => {
    setCodeList(
      codeList.filter((stock) => {
        if (stock !== key) {
          return stock;
        }
      })
    );

    updateList(key);
  };

  const loadData = (stock) => {
    if (update) {
      return (
        <Item key={stock} code={stock} isUpdate={update} test={refreshing} handleDelete={handleDelete}/>
      );
    } else {
      return <Item key={stock} code={stock} handleDelete= {handleDelete}/>
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={sytles.screen}
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
  screen: {
    //backgroundColor:"#D6E8EE"
  }
});

// https://geekscoders.com/courses/react-native/lessons/react-native-floating-action-button/
