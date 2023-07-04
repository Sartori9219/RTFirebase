import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

const ClassList = ({ data }) => {
  console.log("classlist", data)
  const formatSubject = (subject) => {
    const keyWords = subject.split("_");
    const lastWord = keyWords[keyWords.length - 1];
    return lastWord;
  };

  const monthNames = [
    "Jan",
    "Febr",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (timestamp) => {
    const dateFormat = new Date(timestamp);
    return `${monthNames[dateFormat.getMonth() + 1]
      } ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`;
  };

  const [expandedRows, setExpandedRows] = useState([]);
  const [isHover, setIsHover] = useState(null);

  const toggleRowExpansion = (key) => {
    if (expandedRows.includes(key)) {
      setExpandedRows(expandedRows.filter((rowKey) => rowKey !== key));
    } else {
      setExpandedRows([...expandedRows, key]);
    }
  };
  const handleCopy = (item) => {
    if (item.detail) {
      navigator.clipboard.writeText('student progress');
    }
    else {
      navigator.clipboard.writeText('No students');
    }
  }
  const isRowExpanded = (key) => expandedRows.includes(key);

  const renderItem = ({ item, index }) => {
    const isEvenRow = index % 2 === 0;
    const rowStyle = [styles.row, isEvenRow ? styles.evenRow : styles.oddRow];
    const isExpanded = isRowExpanded(item.key);
    const rowContentStyle = [
      styles.rowContent,
      isExpanded && styles.expandedRowContent,
    ];

    return (
      <View style={[rowStyle, { backgroundColor: isHover === index && '#F9F2FF' }]}>
        <Pressable
          style={rowContentStyle}
          onPress={() => toggleRowExpansion(item.key)}
          underlayColor="#f2f2f2"
          onHoverIn={() => setIsHover(index)}
          onHoverOut={() => setIsHover(null)}
        >
          <>
            <Text style={styles.text}>{item.subject.title}</Text>
            <Text style={styles.text}>{item.key}</Text>
            <Text style={styles.text}>{formatSubject(item.subject.key)}</Text>
          </>
        </Pressable>
        {isExpanded && (
          <Pressable
            underlayColor="#f2f2f2"
            onHoverIn={() => setIsHover(index)}
            onHoverOut={() => setIsHover(null)}
            onPress={() => handleCopy(item)}
          >
            <View style={styles.expandedContent}>
              <Text style={styles.detailTitle}>Student Progress</Text>
              {item.details ? (
                item.details.length > 0 ? (
                  <>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCellHeader}>Name</Text>
                      <Text style={styles.tableCellHeader}>Last Signin</Text>
                      <Text style={styles.tableCellHeader}>Steps Attempted</Text>
                      <Text style={styles.tableCellHeader}>Steps Mastered</Text>
                    </View>
                    {item.details.map((detail, index) => (
                      <View
                        style={[
                          styles.tableRow,
                          index % 2 === 0 && styles.evenRow,
                        ]}
                        key={index}
                      >
                        <Text style={styles.tableCell}>{detail.name}</Text>
                        <Text style={styles.tableCell}>
                          {formatDate(detail.lastSignin)}
                        </Text>
                        <Text style={styles.tableCell}>
                          {`${detail.stepsAttempted}/${item.totalSteps
                            } (${Math.floor(
                              (detail.stepsAttempted / item.totalSteps) * 100
                            )}%)`}
                        </Text>
                        <Text style={styles.tableCell}>
                          {`${detail.stepsMastered}/${item.totalSteps
                            } (${Math.floor(
                              (detail.stepsMastered / item.totalSteps) * 100
                            )}%)`}
                        </Text>
                      </View>
                    ))}
                  </>
                ) : (
                  <Text style={styles.noStudents}>No students</Text>
                )
              ) : (
                <Text style={styles.noStudents}>No students</Text>
              )}
            </View>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Title</Text>
        <Text style={styles.headerText}>Class Key</Text>
        <Text style={styles.headerText}>Type</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  rowContent: {
    flexDirection: "row",
  },
  expandedRowContent: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  expandedContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  detailTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
  },
  noStudents: {
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
  text: {
    flex: 1,
  },
});

export default ClassList;
