import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import Axios from "axios";


export default function TableRow({ stock}) {
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
   },[]);
  
  let earning = (((parseInt(data.last_price) - stock.avgPrice) / stock.avgPrice) * 100).toFixed(2)
  
  return (
    <>
      <DataTable.Row>
        <DataTable.Cell>{stock.code}</DataTable.Cell>
        <DataTable.Cell numeric>{stock.avgPrice}</DataTable.Cell>
        <DataTable.Cell numeric>
          <Text
            style={data === ""? null: {color:earning >= 0? "green": "red",}}
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
      </>
    );
}

