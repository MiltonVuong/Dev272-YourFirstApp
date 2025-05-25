// components/FormInput.tsx
import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  borderColor: string;
  textColor: string;
  errorColor: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  borderColor,
  textColor,
  errorColor,
}) => {
  return (
    <View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={borderColor}
      />
      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormInput;
