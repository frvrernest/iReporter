import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { ReportsContext } from "../components/ReportsContext";
import { useRoute } from "@react-navigation/native";

const PostedReportsScreen = ({ navigation }) => {
  const { reports } = useContext(ReportsContext);
  const [serverReports, setServerReports] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState("in progress");
  const [loading, setLoading] = useState(true);

  // Get the first name from the route parameters
  const route = useRoute();
  const { firstName } = route.params;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API endpoint
        const data = await response.json();
        setServerReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        Alert.alert("Error", "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Combine local reports with server reports
  const combinedReports = [...reports, ...serverReports];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello {firstName}!</Text>
          <Avatar
            marginTop={40}
            rounded
            source={{ uri: "https://www.example.com/path/to/avatar.jpg" }}
            size="medium"
          />
        </View>
        <Text style={styles.subtitle}>Your Reports</Text>
        {reports.length > 0 ? (
          reports.map((report) => (
            <View key={report.id} style={styles.issueCard}>
              <Text style={styles.issueTitle}>{report.issue}</Text>
              <Text style={styles.issueNumber}>Issue number: {report.id}</Text>
              <View style={styles.issueStatusContainer}>
                {["pending", "in progress", "completed"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => setSelectedIssue(status)}
                  >
                    <Text
                      style={[
                        styles.issueStatus,
                        selectedIssue === status && styles.issueStatusSelected,
                      ]}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                    <Text style={styles.issueTime}>{report.date}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noReportsText}>No reports available</Text>
        )}
        <Text style={styles.reportsTitle}>Reports from others</Text>
        <FlatList
          data={serverReports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reportItem}>
              <Text style={styles.reportTitle}>{item.issue}</Text>
              <Text style={styles.reportLocation}>{item.location}</Text>
              <Text style={styles.reportDate}>{item.date}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("ReportDetails")}
        >
          <Text style={styles.addButtonText}>Past Reports</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#000000", // Black background color
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    color: "#ffffff",
    paddingRight: 10,
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  issueTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  issueNumber: {
    color: "#bbb",
    fontSize: 12,
    marginBottom: 15,
  },
  issueStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  issueStatus: {
    color: "#bbb",
    fontSize: 12,
    textAlign: "center",
  },
  issueStatusSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  issueTime: {
    color: "#bbb",
    fontSize: 10,
    textAlign: "center",
  },
  noReportsText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
    textAlign: "center",
  },
  reportsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  reportItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  reportLocation: {
    fontSize: 14,
    color: "#555",
  },
  reportDate: {
    fontSize: 12,
    color: "#999",
  },
  addButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#000000",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default PostedReportsScreen;
