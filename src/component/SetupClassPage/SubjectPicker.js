import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Modal
} from "react-native";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const SearchableTextInput = ({
  data,
  query,
  setQuery,
  selectedSubject,
  setSelectedSubject,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [hasResults, setHasResults] = useState(true); // New state variable
  const [isSchFsc, setIsSchFsc] = useState(false); // New state variable
  const [isModal, setIsModal] = useState(false); // New state variable
  const handleSearch = (text) => {
    const filteredItems = data.filter((category) => {
      const filteredCategoryData = category.data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      return filteredCategoryData.length > 0;
    });
    if (selectedSubject) {
      if (text !== selectedSubject.title) {
        setSelectedSubject("");
      }
    }
    setQuery(text);
    setFilteredData(filteredItems);
    setShowResults(true);
    setHasResults(filteredItems.length > 0); // Update hasResults state
  };
  const searchFocus = () => {
    const filteredItems = data.filter((category) => {
      const filteredCategoryData = category.data;
      return filteredCategoryData.length > 0;
    });
    setIsSchFsc(true);
    setFilteredData(filteredItems);
    setShowResults(true);
    setHasResults(filteredItems.length > 0);
  }
  const searchBlur = () => {
    setTimeout(function () {
      if (!query)
        setIsSchFsc(false);
    }, 300);

  }

  const handlePressTitle = (item) => {
    setSelectedSubject(item);
    setQuery(item.title);
    setShowResults(false);
  };
  const renderTitle = ({ item }) => {
    const truncateTitle = (title, limit) => {
      if (title.length > limit) {
        return title.substring(0, limit - 1) + "...";
      }
      return title;
    };

    const keyWords = item.key.split("_");
    var lastWord = keyWords[keyWords.length - 1];
    if (lastWord.trim() === "projectBased") lastWord = "Projects";
    return (
      <Pressable
        onPress={() => handlePressTitle(item)}
        style={(state) => [
          styles.titleContainer,
          state.hovered && styles.hoveredTitle,
        ]}
      >
        <Text style={styles.titleText}>{truncateTitle(item.title, 27)}</Text>
        <Text style={styles.keyText}>{lastWord}</Text>
      </Pressable>
    );
  };

  const renderCategory = ({ item }) => {
    const filteredCategoryData = item.data.filter((title) =>
      title.title.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredCategoryData.length === 0) {
      return null; // Return null if there are no results
    }
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <FlatList
          data={filteredCategoryData}
          renderItem={renderTitle}
          keyExtractor={(item) => item.key}
        />
      </View>
    );
  };
  const modalShow = () => {
    setIsModal(true);
    setTimeout(function () {
      setIsModal(false);
    }, 4000);
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleSearch}
        placeholder="Search"
        onFocus={searchFocus}
        onBlur={searchBlur}
      />
      <Pressable
        onPress={modalShow}
      >
        <OverlayTrigger
          delay={{ hide: 200, show: 300 }}
          overlay={(props) => (
            <Tooltip id="custom-tooltip" {...props}>
              <Text style={{ color: '#fff' }}>
                {`Let us know if you'd like a different setup`}
              </Text>
            </Tooltip>
          )}
          placement="top"
        >
          <Text style={{ textDecorationLine: 'underline' }}>
            HELP
          </Text>
        </OverlayTrigger>

      </Pressable>
      <Modal
        transparent={true}
        visible={isModal}
        onRequestClose={() => {
          setIsModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>mailto:hi@grapeAssignments.com</Text>
          </View>
        </View>
      </Modal>
      {(isSchFsc || query) && (
        <View style={styles.resultsContainer}>
          {hasResults ? (
            <FlatList
              data={filteredData}
              renderItem={renderCategory}
              keyExtractor={(item) => item.category}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    width: 280,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "white",
  },
  resultsContainer: {
    position: "absolute",
    top: "100%",
    width: 280,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    zIndex: 1,
  },
  categoryContainer: {},
  categoryText: {
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  titleContainer: {
    padding: 5,
    borderRadius: 4,
    width: "100%",
  },
  titleText: {},
  keyText: {
    fontSize: 12,
    color: "gray",
  },
  hoveredTitle: {
    backgroundColor: "#f0f0f0",
  },
  noResultsText: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SearchableTextInput;
