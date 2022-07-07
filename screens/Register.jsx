import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Pressable
} from "react-native";
import React,{useState} from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import axios from "axios";

const signUpValidationSchema = yup.object().shape({
  names: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phone_number: yup
    .string()
    .matches(/(07)(\d){8}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required('Password is required')
})

const Register = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [errortext, setErrortext] = React.useState(null);

  const handleSubmit = async (data) => {
    
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.0.229:8000/api/v1/users",data);

      if(response.data.success == true){
        navigation.navigate("Login");
      }
    } catch (err) {
      setErrortext(err.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <Text>Create an account</Text>

      <KeyboardAvoidingView style={styles.form}>
      

          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              names: '',
              email: '',
              phone_number: '',
              password: ''
            }}
            onSubmit={values => handleSubmit(values)}
          >
            {({ handleSubmit, isValid, values }) => (
              <>
              <Text style={styles.lable}>Full name</Text>
                <Field
                  component={CustomInput}
                  name="names"
                  placeholder="Full Name"
                />
                <Text style={styles.lable}>Email</Text>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Text style={styles.lable}>Phone number</Text>
                <Field
                  component={CustomInput}
                  name="phone_number"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Text style={styles.lable}>Password</Text>
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={{ paddingTop: 5, color: "white" }}>
                      Sign Up
                    </Text>
                </Pressable>

                <View style={styles.footer}>
                  <Text>
                    {" "}
                    Already have an account?{" "}
                    <Text
                      style={{ color: "#307A59", fontWeight: "bold" }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign In
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </Formik>
      
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default Register;

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
    fontSize: 16,
    marginVertical: 5,
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
});
