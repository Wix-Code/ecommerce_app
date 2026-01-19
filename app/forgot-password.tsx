import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import { Formik } from 'formik'
import Feather from '@expo/vector-icons/Feather'
import * as Yup from 'yup'

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
})

export default function ForgotPassword() {
  const handleForgotPassword = (values: any) => {
    console.log(values)
    // Handle forgot password logic here
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.create}>Forgot password</Text>
        <Text style={styles.account}>
          Enter your email for the verification process. We will send 4 digits code to your email.
        </Text>
      </View>

      {/* Content with Keyboard Avoiding */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleForgotPassword}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.contain}>
                  <Text style={styles.text}>Email</Text>
                  <View style={[
                    styles.flex,
                    touched.email && errors.email && styles.inputError,
                    touched.email && !errors.email && values.email && styles.inputSuccess
                  ]}>
                    <TextInput
                      placeholder='Enter your email address'
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      keyboardType='email-address'
                      autoCapitalize='none'
                    />
                    {touched.email && !errors.email && values.email && (
                      <FontAwesome6 name="check-circle" size={20} color="#0C9409" />
                    )}
                    {touched.email && errors.email && (
                      <AntDesign name="exclamation-circle" size={20} color="#ED1010" />
                    )}
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Spacer to push button to bottom */}
                <View style={styles.spacer} />

                {/* Send Code Button */}
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    !values.email && styles.sendButtonDisabled
                  ]}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.sendButtonText}>Send Code</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  create: {
    fontSize: 32,
    color: "#1A1A1A",
    fontFamily: "OpenSans_600SemiBold",
    letterSpacing: -2,
    marginBottom: 8,
  },
  account: {
    fontSize: 16,
    color: "#808080",
    fontFamily: "OpenSans_400Regular",
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
  },
  contain: {
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: "OpenSans_500Medium",
    marginBottom: 8,
  },
  flex: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputError: {
    borderColor: "#ED1010",
  },
  inputSuccess: {
    borderColor: "#0C9409",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    color: "#1A1A1A",
  },
  errorText: {
    color: "#ED1010",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    marginTop: 4,
  },
  spacer: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sendButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
})