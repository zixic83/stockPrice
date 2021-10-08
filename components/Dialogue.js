import React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Searchbar,
} from "react-native-paper";
import SearchBar from "./SearchBar";

export default function Dialogue({ isVisible, resetDia, handleSubmit }) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => resetDia();

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <>
      <Provider>
        <Portal>
          <Modal
            visible={isVisible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
            <Button
              mode="contained"
              onPress={() => {
                handleSubmit(searchQuery);
                setVisible(false);
              }}
            >
              Submit
            </Button>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
}
