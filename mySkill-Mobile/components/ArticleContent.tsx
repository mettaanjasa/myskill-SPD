import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

type ArticleContentProps = { content: string };

export default function ArticleContent( {content}: ArticleContentProps) {
  const { width } = useWindowDimensions();
  
  return (
    <RenderHtml
      contentWidth={width - 50}
      source={{ html: content }}
      systemFonts={[
        "Montserrat_400Regular",
        "Montserrat_500Medium",
        "Montserrat_600SemiBold",
        "MontserratAlternates_600SemiBold",
        "MontserratAlternates_800ExtraBold"
      ]}

      baseStyle={{
        fontFamily: "Montserrat_400Regular",
        fontSize: 15,
        lineHeight: 25
      }}
      
      tagsStyles={{
        h1: {
          fontFamily: "MontserratAlternates_800ExtraBold",
          fontSize: 28,
          lineHeight: 36,
          marginTop: 20,
          marginBottom: 12
        },

        h2: {
          fontFamily: "MontserratAlternates_800ExtraBold",
          fontSize: 23,
          lineHeight: 30,
          marginTop: 18,
          marginBottom: 10
        },

        h3: {
          fontFamily: "MontserratAlternates_600SemiBold",
          fontSize: 19,
          lineHeight: 26,
          marginTop: 15,
          marginBottom: 8
        },

        p: {
          fontFamily: "Montserrat_400Regular",
          fontSize: 15,
          lineHeight: 20,
          marginBottom: 15
        },

        strong: {fontFamily: "Montserrat_600SemiBold",},

        em: {
          fontFamily: "Montserrat_400Regular",
        },

        ul: {
          marginBottom: 15
        },

        ol: {
          marginBottom: 15
        },

        li: {
          fontFamily: "Montserrat_400Regular",
          fontSize: 15,
          lineHeight: 25,
          marginBottom: 5
        },

        blockquote: {
          fontFamily: "Montserrat_400Regular",
          fontSize: 15,
          lineHeight: 25,
          marginVertical: 15,
          paddingLeft: 15,
        },

        a: {
          textDecorationLine: "underline",
        },
      }}
    />
  );
}