import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useAuth } from "../components/GlobalContext";
import CustomInput from "../components/CustomInput";
import axios from "axios";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
});

const Login = ({ navigation }) => {

  const [animating, setAnimating] = useState(true);
  const { getAuthState } = useAuth();

  // React.useEffect(() => {
  //     initialize();
  // }, []);

  // async function initialize() {
    
  //     try {
  //       console.log("initialize");
  //         const {user} = await getAuthState();
          
  //         if (user) {
  //             let currentUser = !!(user.id);
  //             if (currentUser) navigation.navigate('TabNavigation');
  //             else navigation.navigate('Login')

  //         } else navigation.navigate('Login');
  //     } catch (e) {
  //       navigation.navigate('Login');
  //     }
  // }

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(null);

  const { handleLogin } = useAuth();

  const handleSubmit = async (data) => {
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.0.188:8000/api/v1/auth/login",
        data
      );
      console.log(response.data);
      await handleLogin(response.data);
      if (response.data.success == true) {
        navigation.navigate("TabNavigation");
      }
    } catch (err) {
      setErrortext(err.response.data.message);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text>Sign in to your acount</Text>

      <KeyboardAvoidingView style={styles.form}>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit, isValid, values }) => (
            <>
              <Text style={styles.lable}>Email</Text>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />
              <Text style={styles.lable}>Password</Text>
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ paddingTop: 5, color: "white" }}>Sign In</Text>
              </TouchableOpacity>

              {errortext != "" ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}

              <View style={styles.footer}>
                <Text>
                  {" "}
                  Don't have an account?{" "}
                  <Text
                    style={{ color: "#307A59", fontWeight: "bold" }}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Sign up
                  </Text>
                </Text>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  //form
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  lable: {
    fontSize: 17,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#307A59",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginVertical: 10,
    borderRadius: 5,
  },
  footer: {
    alignSelf: "center",
    marginTop: 20,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
