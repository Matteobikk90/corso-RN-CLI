import React from 'react';
import { Pressable, Text, Vibration, View } from 'react-native';

const patterns = [
  { label: '💬 Soft', type: 'soft' },
  { label: '🔔 Light', type: 'impactLight' },
  { label: '💥 Heavy', type: 'impactHeavy' },
  { label: '✅ Success', type: 'notificationSuccess' },
  { label: '⚠️ Warning', type: 'notificationWarning' },
] as const;

export function HapticsScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white dark:bg-slate-900 px-8">
      <Text className="text-6xl">📳</Text>
      <Text className="text-2xl font-bold text-slate-800">Haptics</Text>
      <Text className="text-lg font-bold text-slate-800">
        Tocca per far sentire i patterns
      </Text>
      {patterns.map(({ label, type }) => (
        <Pressable
          key={type}
          className="mt-4 rounded-2xl bg-indigo-500 px-10 py-4 active:opacity-70"
          onPress={() => Vibration.vibrate([0, 200, 100, 200])}
        >
          <Text className="font-semibold text-white">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
