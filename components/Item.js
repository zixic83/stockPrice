import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import * as Linking from "expo-linking";
import Axios from "axios";
// https://au.finance.yahoo.com/quote/wow.Ax

export default function Item({ code, isUpdate}) {
  const [data, setData] = useState("");
  const [company, setCompany] = useState("");
  const baseUrl = `https://www.asx.com.au/asx/1/share/${code}`;
  const baseCompany = `https://www.asx.com.au/asx/1/company/${code}`;

  const shareData = () => {
    Axios.get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("not found");
      });
  };

  const companyData = () => {
    Axios.get(baseCompany)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        alert("not found");
      });
  };

  useEffect(() => {
    shareData();
    companyData();
  },[isUpdate]);

  const titleCase = (s) => {
    //titleCase(company.name_full)
    const changed = s
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
    return changed;
    };
    
 _handlePress = () => {
   Linking.openURL(`https://au.finance.yahoo.com/quote/${code}.Ax`);
    };
    
  const toRender = () => {
    if (data && company) {
      return (
        <>
          <TouchableOpacity onPress={_handlePress}>
            <List.Item
              title={code}
              description={titleCase(company.name_abbrev)}
              left={(props) => (
                <Avatar.Image
                  size={70}
                  style={{ backgroundColor: "white" }}
                  source={{
                    uri: `https://files.marketindex.com.au/xasx/96x96-png/${code.toLowerCase()}.png`,
                  }}
                />
              )}
              right={(props) => (
                <View>
                  <Text>{data.last_price}</Text>
                  <Text
                    style={
                      data === undefined
                        ? null
                        : {
                            color:
                              data.change_in_percent.slice(0, -1) >= 0
                                ? "green"
                                : "red",
                          }
                    }
                  >
                    {data.change_price + " "}
                    {data.change_in_percent}
                  </Text>
                </View>
              )}
            />
          </TouchableOpacity>
          <Divider />
        </>
      );
    }
  };

  console.log('rerendered',code)

  return (
    <View>
      {toRender()}
      {/* <Button title="More Information" onPress={_handlePress} /> */}
    </View>
  );
}
