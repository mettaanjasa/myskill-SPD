import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../constants/api";
import ArticleCard from "../components/ArticleCard";

type Article = {
  _id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[]
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    const loadHome = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/");
          return;
        }
        setUsername(storedUsername || "");

        const response = await fetch(`${API_URL}/api/articles`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch articles.");
          return;
          }
        setArticles(data);
      } catch (error) {
        console.error("Failed to load home:", error);
        setError("Unable to connect to the server.");
      } finally { 
        setLoading(false);
      }
  };
  loadHome();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([ "token", "username", "userId" ]);
    router.replace("/");
  };
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}> Welcome,{" "}</Text>
          <Text style={styles.username}>{username}</Text>
        </View>

        <Pressable style={({ pressed }) => [ styles.logoutButton, 
          pressed && styles.logoutPressed,]}
          onPress={handleLogout}
          >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>

      {error ? ( <Text style={styles.error}> {error} </Text> ) : null}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articleList}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Articles</Text>
        </View>
        {articles.map((article) => ( <ArticleCard key={article._id} article={article}/> ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  center: { flex: 1, justifyContent: "center" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 2
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 10
  },
  welcome: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 18,
    letterSpacing: -0.5
  },
  username: {
    fontFamily: "MontserratAlternates_800ExtraBold",
    fontSize: 24
  },

  logoutButton: {
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "black"
  },

  logoutPressed: { backgroundColor: "#4b4b4b" },
  logoutText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    color: "white",
    letterSpacing: -0.5
  },

  titleContainer: { marginBottom: 10},

  pageTitle: {
    fontFamily: "MontserratAlternates_600SemiBold",
    fontSize: 48,
    letterSpacing: -2,
    textDecorationLine: "underline"
  },

  articleList: { padding: 25 },

  error: {
    color: "red",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    marginBottom: 15
  }
});