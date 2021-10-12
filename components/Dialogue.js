import React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Searchbar,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";

export default function Dialogue({ isVisible, resetDia, handleSubmit }) {
  const [visible, setVisible] = React.useState(false);
  const [isDisabled, setIsdisabled] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => resetDia();

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query.length !== 3) {
      setIsdisabled(true)
    } else {
      setIsdisabled(false)
    }
  };

  const containerStyle = {
    backgroundColor: "white",
    marginTop: -360,
    marginLeft: 7,
    marginRight:7
  };

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            visible={isVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View renderToHardwareTextureAndroid>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                autoFocus
              />

              <Button
                mode="contained"
                onPress={() => {
                  handleSubmit(searchQuery);
                  setVisible(false);
                }}
                disabled={isDisabled}
                style={styles.button}
              >
                Submit
              </Button>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 5,
  }
})
