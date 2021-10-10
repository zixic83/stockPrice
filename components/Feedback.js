import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

export default function Feedback() {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // To clear or cancel a timer, you call the clearTimeout(); method,
    // passing in the timer object that you created into clearTimeout().

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={true}
        action={{
          label: "Undo",
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    flex: 1,
    justifyContent: "space-between",
  },
});
