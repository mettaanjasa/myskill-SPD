import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFonts } from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold
} from "@expo-google-fonts/montserrat";
import {
  MontserratAlternates_600SemiBold,
  MontserratAlternates_800ExtraBold
} from "@expo-google-fonts/montserrat-alternates";

import { API_URL } from "../../constants/api";
import ArticleContent from "../../components/ArticleContent";
import ArticleCard from "../../components/ArticleCard";

type Article = {
  _id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[]
};

export default function Article() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [article, setArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_800ExtraBold
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const [articleResponse, articlesResponse] = await Promise.all([
          fetch(`${API_URL}/api/articles/${id}`),
          fetch(`${API_URL}/api/articles`)
        ]);
        const articleData = await articleResponse.json();
        const articlesData = await articlesResponse.json();

        if (!articleResponse.ok) {
          setError( articleData.message || "Article not found." );
          return;
        }
        if (!articlesResponse.ok) {
          setError(articlesData.message || "Failed to fetch recommended articles." );
          return;
        }

        setArticle(articleData);
        setArticles(articlesData);
      } catch (error) {
        console.error( "Failed to fetch article:", error);
        setError("Unable to connect to the server.");
      } finally { setLoading(false)}
    };

    if (id) { fetchArticles() }
  }, [id]);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove([ "token", "username", "userId" ]);
    router.replace("/");
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000"/>
      </View>
    );
  }

  if (error || !article) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </Pressable>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>

        <View style={styles.center}>
          <Text style={styles.error}>{error || "Article not found."}</Text>
        </View>
      </View>
    );
  }

  const currentIndex = articles.findIndex((item) => item._id === article._id);

  const recommendedArticles = currentIndex !== -1 ? [
    articles[(currentIndex - 1 + articles.length) % articles.length],
    articles[(currentIndex + 1) % articles.length],
  ].filter((item, index, self) => 
    item && item._id !== article._id && self.findIndex((other) => 
      other?._id === item._id) === index) : articles.filter((item) => 
        item._id !== article._id)
  .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        
        <Pressable style={({ pressed }) => [ styles.logoutButton, pressed && styles.logoutPressed]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.meta}>
          <Text style={styles.date}>{article.date}</Text>
          <View style={styles.tags}>
            {article.tags.map((tag, index) => (<Text key={index} style={styles.tag}> #{tag}</Text>))}
          </View>
        </View>

        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>By {article.author}</Text>
        <Text style={styles.description}>{article.description}</Text>
        
        <View style={styles.divider} />
        <ArticleContent content={article.content}/>
        <View style={styles.divider} />
        
        {recommendedArticles.length > 0 && (
          <View style={styles.recommended}>
            <Text style={styles.recommendedTitle}>Recommended Articles</Text>
            {recommendedArticles.map((recommended) => (<ArticleCard key={recommended._id} article={recommended}/>))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 2
  },

  backButtonText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18
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

  content: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 50
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
    marginTop: 20
  },

  date: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },

  tag: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12
  },

  title: {
    fontFamily: "MontserratAlternates_800ExtraBold",
    fontSize: 32,
    lineHeight: 30,
    marginBottom: 10,
    letterSpacing: -1
  },

  author: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    marginBottom: 10
  },

  description: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 25,
    letterSpacing: -0.5
  },

  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginBottom: 25
  },

  recommended: {
    marginTop: 0,
  },

  recommendedTitle: {
    fontFamily: "MontserratAlternates_600SemiBold",
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -1,
    textDecorationLine: "underline",
    marginBottom: 15
  },

  error: {
    color: "red",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    textAlign: "center"
  },
});