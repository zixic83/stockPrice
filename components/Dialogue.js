import React from 'react';
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import SearchBar from './SearchBar';

export default function Dialogue({isVisible,resetDia,handleSubmit}) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => resetDia();
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
                  <SearchBar handleSubmit={handleSubmit}/>
        </Modal>
      </Portal>
    </Provider>
  );
}
