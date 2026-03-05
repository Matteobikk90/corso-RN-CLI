import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Share from 'react-native-share';

export function ClipboardScreen() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;

    Clipboard.setString(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePaste = async () => setText(await Clipboard.getString());

  const handleShare = () => {
    if (!text) return;

    Share.open({ message: text });
  };

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white dark:bg-slate-900 px-8">
      <Text className="text-6xl">📋</Text>
      <Text className="text-2xl font-bold text-slate-800">
        Clipboard and share
      </Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Scrivi qualcosa...."
        multiline
        numberOfLines={4}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 w-full"
      />
      <View className="gap-4 flex-row">
        <Pressable
          onPress={handleCopy}
          className="rounded-2xl bg-indigo-500 py-4 active:opacity-50 flex-1"
        >
          <Text className="text-lg font-bold text-slate-800 text-center">
            {copied ? 'Copiato' : 'Copia'}
          </Text>
        </Pressable>
        <Pressable
          onPress={handlePaste}
          className="rounded-2xl bg-slate-200 py-4 active:opacity-50 flex-1"
        >
          <Text className="text-lg font-bold text-slate-800 text-center">
            Incolla
          </Text>
        </Pressable>
        <Pressable
          onPress={handleShare}
          className="rounded-2xl bg-emerald-500 py-4 active:opacity-50 flex-1"
        >
          <Text className="text-lg font-bold text-slate-800 text-center">
            Condividi
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
