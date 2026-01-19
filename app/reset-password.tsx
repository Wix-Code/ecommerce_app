import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link } from 'expo-router'
import { Formik } from 'formik'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Yup from 'yup'

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleResetPassword = (values: any) => {
    console.log(values)
    // Handle reset password logic here
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
        <Text style={styles.create}>Reset Password</Text>
        <Text style={styles.account}>
          Set the new password for your account so you can login and access all the features.
        </Text>
      </View>

      {/* Content with Keyboard Avoiding */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleResetPassword}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* Password Input */}
                <View style={styles.contain}>
                  <Text style={styles.text}>New Password</Text>
                  <View style={[
                    styles.flex,
                    touched.password && errors.password && styles.inputError,
                    touched.password && !errors.password && values.password && styles.inputSuccess
                  ]}>
                    <TextInput
                      placeholder='Enter new password'
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

                {/* Confirm Password Input */}
                <View style={styles.contain}>
                  <Text style={styles.text}>Confirm Password</Text>
                  <View style={[
                    styles.flex,
                    touched.confirmPassword && errors.confirmPassword && styles.inputError,
                    touched.confirmPassword && !errors.confirmPassword && values.confirmPassword && styles.inputSuccess
                  ]}>
                    <TextInput
                      placeholder='Re-enter new password'
                      style={styles.input}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons
                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#808080"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}
                </View>

                {/* Spacer to push button to bottom */}
                <View style={styles.spacer} />

                {/* Reset Password Button */}
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    (!values.password || !values.confirmPassword) && styles.sendButtonDisabled
                  ]}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.sendButtonText}>Reset Password</Text>
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