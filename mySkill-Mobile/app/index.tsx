import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import {
  MontserratAlternates_600SemiBold,
  MontserratAlternates_800ExtraBold
} from "@expo-google-fonts/montserrat-alternates";

import { API_URL } from "../constants/api";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_800ExtraBold
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    
    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({identifier, password})
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }
      
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("username", data.user.username);
      await AsyncStorage.setItem("userId", data.user.id);
      
      Alert.alert("Login Successful.");
      
      router.replace("/home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.logo}>mySkill</Text>
        </View>
      
      <View style={styles.form}>

        <TextInput style={styles.input}
          placeholder="Email / Username"
          placeholderTextColor="#919191"
          value={identifier}
          onChangeText={(text) => { setIdentifier(text); setError("")}}
          autoCapitalize="none"
          />

        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#919191"
            value={password}
            onChangeText={(text) => { setPassword(text); setError(""); }}
            secureTextEntry={!showPassword}
            />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off"} size={28}/>
            </Pressable>
          </View>
        
        {error ? (<Text style={styles.error}>{error}</Text>) : null}

        <Pressable style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.submitButtonPressed]}
          onPress={handleLogin}>
          
          <Text style={styles.submitText}>Sign In</Text>
          </Pressable>

        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Link href="/register" style={styles.registerLink}>
            Sign Up
            </Link>
          </Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center"
  },

  welcome: {
    margin: 50,
    alignItems: "center"
  },
  welcomeText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 27,
    letterSpacing: -2,
    alignSelf: "flex-start"
  },
  logo: {
    fontFamily: "MontserratAlternates_800ExtraBold",
    fontSize: 64,
    marginTop: -35,
    letterSpacing: -4
  },

  form: {
    width: "90%",
    alignSelf: "center"
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    fontFamily: "Montserrat_400Regular",
    fontSize: 17,
    marginBottom: 30
  },
  passwordContainer: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  passwordInput: {
    flex: 1,
    fontFamily: "Montserrat_400Regular",
    fontSize: 17
  },

  error: {
    color: "red",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14
  },

  submitButton: {
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 28,
    marginTop: 10
  },
  submitButtonPressed: { backgroundColor: "#4b4b4b"},
  submitText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 17,
    color: "white"
  },

  registerText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 15,
    marginTop: 20,
    alignSelf: "center",
    letterSpacing: -0.5
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
    fontFamily: "Montserrat_600SemiBold",
  }
});