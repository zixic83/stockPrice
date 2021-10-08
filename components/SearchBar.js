import React from 'react'
import { Searchbar, Button } from "react-native-paper";

export default function SearchBar({handleSubmit}) {
      const [searchQuery, setSearchQuery] = React.useState("");
      const onChangeSearch = (query) => setSearchQuery(query);

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Button
          mode="contained"
          onPress={() => handleSubmit(searchQuery)}
        >
          Submit
        </Button>
      </>
    );


}
