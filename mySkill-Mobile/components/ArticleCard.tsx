import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

type Article = {
  _id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
};

type ArticleCardProps = { article: Article };

export default function ArticleCard( {article} : ArticleCardProps) {
  const router = useRouter();

  return (
    <View style={styles.articleCard}>
      <View style={styles.tags}>
        {article.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>#{tag}</Text>
        ))}
      </View>
      <Text style={styles.articleTitle}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>

      <Pressable style={({ pressed }) => [styles.readButton, pressed && styles.readButtonPressed]}
        onPress={() => router.push(`/article/${article._id}`)}>
        <Text style={styles.readButtonText}>Read More</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  articleCard: {
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 20,
    paddingVertical: 30,
    marginBottom: 20
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12
  },

  tag: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12
  },

  articleTitle: {
    fontFamily: "MontserratAlternates_600SemiBold",
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: -1,
    lineHeight: 25,
    borderBottomWidth: 1.5,
    paddingBottom: 15
  },

  description: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20
  },

  readButton: {
    alignSelf: "flex-start",
    backgroundColor: "#000000",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 17
  },

  readButtonPressed: { backgroundColor: "#4b4b4b" },

  readButtonText: {
    color: "#ffffff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    letterSpacing: -0.5
  },
});