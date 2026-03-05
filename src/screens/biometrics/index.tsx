import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export function BiometricsScreen() {
  const [result, setResult] = useState('');

  const handleAuth = async () => {
    try {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();
      console.log({ available });
      console.log({ biometryType });
      if (!available) return setResult('Biometria non disponibile');

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Autenticati per continuare',
      });

      setResult(success ? `${biometryType} riconosciuto` : 'Annullato');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white dark:bg-slate-900 px-8">
      <Text className="text-6xl">🔐</Text>
      <Text className="text-2xl font-bold text-slate-800">Biometria</Text>
      <Text className="text-lg font-bold text-slate-800">
        Face ID o impronta digitale
      </Text>
      <Pressable
        className="mt-4 rounded-2xl bg-indigo-500 px-10 py-4 active:opacity-70"
        onPress={handleAuth}
      >
        <Text className="font-semibold text-white">Autenticati</Text>
      </Pressable>
      {result ? (
        <Text className="text-center text-slate-700">{result}</Text>
      ) : null}
    </View>
  );
}
