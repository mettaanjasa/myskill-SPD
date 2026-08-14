import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";

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

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    try {
      const response = await fetch( `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",},
          body: JSON.stringify({email, username, password})
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      Alert.alert(
        "Registration Successful",
        "Your account has been created. Please Log In.",
        [{text: "OK", onPress: () => router.replace("/")}]
      );
    } catch (error) {
      console.error("Registration error:", error);
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

      <TextInput style={styles.input} placeholder="Email"
        placeholderTextColor="#919191"
        value={email}
        onChangeText={(text) => { setEmail(text); setError("") }}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Username"
        placeholderTextColor="#919191"
        value={username}
        onChangeText={(text) => { setUsername(text); setError("") }}
        autoCapitalize="none"
      />
        
      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Password"
          placeholderTextColor="#919191"
          value={password}
          onChangeText={(text) => { setPassword(text); setError("") }}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)} >
          <Ionicons name={showPassword ? "eye-outline" : "eye-off"} size={28} />
        </Pressable>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput style={styles.passwordInput} placeholder="Confirm Password"
          placeholderTextColor="#919191"
          value={confirmPassword}
          onChangeText={(text) => { setConfirmPassword(text); setError("") }}
          secureTextEntry={!showConfirmPassword}
        />
        <Pressable onPress={ () => setShowConfirmPassword(!showConfirmPassword) }>
          <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off"} size={28}/>
        </Pressable>
      </View>

      {error ? ( <Text style={styles.error}>{error}</Text> ) : null}

      <Pressable style={({ pressed }) => [ styles.submitButton,
        pressed && styles.submitButtonPressed]}
        onPress={handleRegister}>
        <Text style={styles.submitText}>Register</Text>
      </Pressable>

      <Text style={styles.registerText}>
        Already have an account?{" "}
        <Link href="/" style={styles.registerLink}>Sign In</Link>
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