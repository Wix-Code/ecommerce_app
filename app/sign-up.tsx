import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Formik } from 'formik'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const GoogleIcon = () => (
  <View style={styles.googleIconContainer}>
    <Text style={styles.googleIconText}>G</Text>
  </View>
)

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = (values: any) => {
    console.log(values)
    // Handle signup logic here
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.create}>Create an account</Text>
        <Text style={styles.account}>Let's create your account.</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ fullName: '', email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* Full Name Input */}
                <View style={styles.contain}>
                  <Text style={styles.text}>Full Name</Text>
                  <View style={[
                    styles.flex,
                    touched.fullName && errors.fullName && styles.inputError,
                    touched.fullName && !errors.fullName && values.fullName && styles.inputSuccess
                  ]}>
                    <TextInput
                      placeholder='Enter your full name'
                      style={styles.input}
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                    />
                    {touched.fullName && !errors.fullName && values.fullName && (
                      <FontAwesome6 name="check-circle" size={20} color="#0C9409" />
                    )}
                    {touched.fullName && errors.fullName && (
                      <AntDesign name="exclamation-circle" size={20} color="#ED1010" />
                    )}
                  </View>
                  {touched.fullName && errors.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                </View>

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

                {/* Password Input */}
                <View style={styles.contain}>
                  <Text style={styles.text}>Password</Text>
                  <View style={[
                    styles.flex,
                    touched.password && errors.password && styles.inputError,
                    touched.password && !errors.password && values.password && styles.inputSuccess
                  ]}>
                    <TextInput
                      placeholder='Enter your password'
                      style={styles.input}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                      autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#808080"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Terms and Conditions */}
                <Text style={styles.terms}>
                  By signing up you agree to our{' '}
                  <Text style={styles.termsBold}>Terms,</Text>{' '}
                  <Text style={styles.termsBold}>Privacy Policy,</Text> and{' '}
                  <Text style={styles.termsBold}>Cookie Use</Text>
                </Text>

                {/* Create Account Button */}
                <TouchableOpacity
                  style={[
                    styles.createButton,
                    (!values.fullName || !values.email || !values.password) && styles.createButtonDisabled
                  ]}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.createButtonText}>Create an Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign Up */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <View style={styles.socialButtonContent}>
              <GoogleIcon />
              <Text style={styles.socialButtonText}>Sign Up with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Facebook Sign Up */}
          <TouchableOpacity style={styles.facebookButton} activeOpacity={0.8}>
            <View style={styles.socialButtonContent}>
              <FontAwesome5 name="facebook" size={24} color="white" />
              <Text style={styles.facebookButtonText}>Sign Up with Facebook</Text>
            </View>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link style={styles.loginLink} href="/login">Log In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
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
  },
  formContainer: {
    marginBottom: 20,
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
  terms: {
    color: "#1A1A1A",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    lineHeight: 20,
    marginBottom: 20,
  },
  termsBold: {
    fontFamily: "OpenSans_600SemiBold",
  },
  createButton: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  dividerText: {
    color: "#808080",
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  socialButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  socialButtonText: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  facebookButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "OpenSans_500Medium",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#808080",
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  loginLink: {
    color: "#1A1A1A",
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  },
})