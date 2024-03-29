import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import * as Linking from "expo-linking";
import Axios from "axios";
import Swipeable from "react-native-swipeable";
import { AntDesign } from "@expo/vector-icons";

export default function Item({ code, isUpdate, handleDelete }) {
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
        if (error.response.status === 404) {
          handleDelete(code);
          Alert.alert('Error',"Stock code entered is invalid")
        } else {
          alert("Error occured when adding stock");
        }
      });
  };

  const companyData = () => {
    Axios.get(baseCompany)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        handleDelete(code);
      });
  };

  useEffect(() => {
    shareData();
    companyData();
  }, [isUpdate]);

  const titleCase = (s) => {
    //titleCase(company.name_full)
    const changed = s
      .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
    return changed;
  };

  const handlePress = () => {
    Linking.openURL(`https://au.finance.yahoo.com/quote/${code}.Ax`);
  };


  const rightContent = (
    <View style={[styles.actionText]}>
      <AntDesign name="delete" color="white" size={30} style={{marginLeft:20}}/>
    </View>
  );

  const toRender = () => {
    if (data && company) {
      return (
        <>
          <Swipeable
            rightContent={rightContent}
            onRightActionRelease={() => handleDelete(code)}
          >
            <List.Item
              title={code}
              description={titleCase(company.name_abbrev)}
              left={(props) => (
                <TouchableOpacity onPress={handlePress}>
                  <Avatar.Image
                    size={70}
                    style={{ backgroundColor: "white" }}
                    source={{
                      uri: `https://files.marketindex.com.au/xasx/96x96-png/${code.toLowerCase()}.png`,
                    }}
                  />
                </TouchableOpacity>
              )}
              right={(props) => (
                <View style={styles.price}>
                  <Text
                    style={
                      data === undefined
                        ? null
                        : {
                            color:
                              data.change_in_percent.slice(0, -1) >= 0
                                ? "green"
                                : "red",
                            fontSize: 20,
                          }
                    }
                  >
                    {data.change_in_percent}
                  </Text>
                  <Text>
                    {data.change_price + " "}
                    {data.last_price}
                  </Text>
                </View>
              )}
            />
            <Divider />
          </Swipeable>
        </>
      );
    }
  };

  return <View>{toRender()}</View>;
}

const styles = StyleSheet.create({
  price: {
    marginTop: 10,
    paddingRight: 5,
  },
  actionText: {
    backgroundColor: "#fff",
    fontWeight: "600",
    justifyContent: "center",
    backgroundColor: "#a62c2a",
    flex: 1,
  },
});
