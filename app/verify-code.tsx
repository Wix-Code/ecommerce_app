import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { Formik } from 'formik'
import Feather from '@expo/vector-icons/Feather'
import * as Yup from 'yup'

const OTPSchema = Yup.object().shape({
  digit1: Yup.string().required().length(1),
  digit2: Yup.string().required().length(1),
  digit3: Yup.string().required().length(1),
  digit4: Yup.string().required().length(1),
})

export default function OTPVerification() {
  const [email] = useState('cody.fisher45@example.com')
  const input2Ref = useRef<TextInput>(null)
  const input3Ref = useRef<TextInput>(null)
  const input4Ref = useRef<TextInput>(null)

  const handleOTPVerification = (values: any) => {
    const otp = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}`
    console.log('OTP:', otp)
    // Handle OTP verification logic here
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <Link href="/forgot-password" asChild>
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.create}>Enter 4 Digit Code</Text>
        <Text style={styles.account}>
          Enter 4 digit code that you received on your email <Text style={{
            fontFamily: "OpenSans_600SemiBold",
          }}>({email})</Text>.
        </Text>
      </View>

      {/* Content with Keyboard Avoiding */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ digit1: '', digit2: '', digit3: '', digit4: '' }}
            validationSchema={OTPSchema}
            onSubmit={handleOTPVerification}
          >
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
              <View style={styles.formContainer}>
                {/* OTP Input Boxes */}
                <View style={styles.otpContainer}>
                  <TextInput
                    style={[styles.otpInput, values.digit1 && styles.otpInputFilled]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={values.digit1}
                    onChangeText={(text) => {
                      setFieldValue('digit1', text)
                      if (text) input2Ref.current?.focus()
                    }}
                    autoFocus
                  />
                  <TextInput
                    ref={input2Ref}
                    style={[styles.otpInput, values.digit2 && styles.otpInputFilled]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={values.digit2}
                    onChangeText={(text) => {
                      setFieldValue('digit2', text)
                      if (text) input3Ref.current?.focus()
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !values.digit2) {
                        setFieldValue('digit1', '')
                      }
                    }}
                  />
                  <TextInput
                    ref={input3Ref}
                    style={[styles.otpInput, values.digit3 && styles.otpInputFilled]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={values.digit3}
                    onChangeText={(text) => {
                      setFieldValue('digit3', text)
                      if (text) input4Ref.current?.focus()
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !values.digit3) {
                        input2Ref.current?.focus()
                        setFieldValue('digit2', '')
                      }
                    }}
                  />
                  <TextInput
                    ref={input4Ref}
                    style={[styles.otpInput, values.digit4 && styles.otpInputFilled]}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={values.digit4}
                    onChangeText={(text) => {
                      setFieldValue('digit4', text)
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace' && !values.digit4) {
                        input3Ref.current?.focus()
                        setFieldValue('digit3', '')
                      }
                    }}
                  />
                </View>
                {/* Resend Code */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Email not received? </Text>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Resend Code</Text>
                  </TouchableOpacity>
                </View>

                {/* Spacer to push button to bottom */}
                <View style={styles.spacer} />

                {/* Continue Button */}
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    (!values.digit1 || !values.digit2 || !values.digit3 || !values.digit4) && styles.sendButtonDisabled
                  ]}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.sendButtonText}>Continue</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop: 32,
    marginBottom: 24,
    marginHorizontal: 30,
    gap: 12,
  },
  otpInput: {
    flex: 1,
    height: 64,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'OpenSans_600SemiBold',
    color: '#1A1A1A',
  },
  otpInputFilled: {
    borderColor: '#0C9409',
    backgroundColor: '#F0FFF0',
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
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    textDecorationLine: "underline",
  },
})