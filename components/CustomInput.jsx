import React from 'react'
import { Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        style={[
          styles.textInput,
          props.multiline && { height: props.numberOfLines * 40 },
          hasError 
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderRadius: 10,
    textAlignVertical: 'top',
    backgroundColor:'#F5F5F5'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginTop: 5,
  }
})

export default CustomInput