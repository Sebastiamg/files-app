import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import Voice from "@react-native-voice/voice";
import Icon from "react-native-vector-icons/Ionicons";

import { formatName } from "../utils/formatName";
import { Activity } from "../common/interfaces/data.interface";
import { activityActions } from "../common/reducers/dailyActiviry-reducer";
import { formStyles, inputStyles, voiceStyles } from "../common/styles/styles";

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

interface Props {
  componentTitle: keyof Activity;
  dispatch: React.Dispatch<activityActions>;
}

export default function SpeechInput({ componentTitle, dispatch }: Props) {
  const [speechedValue, setSpeechedValue] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string>("");

  useSpeechRecognitionEvent("start", () => setIsRecording(true));
  useSpeechRecognitionEvent("end", () => setIsRecording(false));
  useSpeechRecognitionEvent("result", (event) => {
    setSpeechedValue(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    setSpeechError(event.message);
    console.log("error code:", event.error, "error message:", event.message);
  });

  async function startRecording() {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "en-US",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  }

  async function stopRecording() {}

  return (
    <View style={[formStyles.form__date__container]}>
      <Text style={[formStyles.form__date__title]}>
        {formatName(componentTitle)}:
      </Text>
      <TextInput
        style={[inputStyles.input__component]}
        multiline
        numberOfLines={10}
        value={speechedValue}
      />
      <Pressable
        style={[
          formStyles.form__date__icon,
          isRecording
            ? voiceStyles.voice__mic__off
            : voiceStyles.voice__mic__on,
        ]}
        onPress={isRecording ? stopRecording : startRecording}
        // onPress={jaja}
      >
        <Icon
          name={isRecording ? "mic-outline" : "mic-off-outline"}
          size={30}
          color="black"
          style={[formStyles.form__date__icon2]}
        />
      </Pressable>
    </View>
  );
}
