import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { formatName } from "../utils/formatName";
import { Activity } from "../common/interfaces/data.interface";
import { formStyles, inputStyles, voiceStyles } from "../common/styles/styles";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import {
  ActivityStateContext,
  ActivityDispatchContext,
} from "./contexts/ActivityContext";

interface Props {
  componentTitle: keyof Activity;
}

export default function SpeechInput({ componentTitle }: Props) {
  const activityState = useContext(ActivityStateContext);
  const activityDispatch = useContext(ActivityDispatchContext);

  // const [speechedValue, setSpeechedValue] = useState<string>(
  //   activityState[componentTitle] as string,
  // );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string>("");

  useSpeechRecognitionEvent("start", () => {
    // setSpeechedValue("");
    setIsRecording(true);
  });
  useSpeechRecognitionEvent("end", (e) => {
    setIsRecording(false);
    // activityDispatch({
    //   type: "add-any",
    //   payload: { key: componentTitle, value: formatName(speechedValue, true) },
    // });
  });
  useSpeechRecognitionEvent("result", (event) => {
    // setSpeechedValue(event.results[0]?.transcript);
    activityDispatch({
      type: "add-any",
      payload: {
        key: componentTitle,
        value: formatName(event.results[0]?.transcript, true),
      },
    });
  });
  useSpeechRecognitionEvent("error", (event) => {
    setSpeechError(event.message);
    console.log("error code:", event.error, "error message:", event.message);
  });

  const handleChange = (text: string) => {
    // setSpeechedValue(text);
    activityDispatch({
      type: "add-any",
      payload: { key: componentTitle, value: formatName(text, true) },
    });
  };

  async function startRecording() {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    // Start speech recognition
    ExpoSpeechRecognitionModule.start({
      lang: "es-Mx",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      requiresOnDeviceRecognition: false,
      addsPunctuation: false,
      contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
    });
  }

  async function stopRecording() {
    ExpoSpeechRecognitionModule.stop();
  }

  return (
    <View style={[formStyles.form__date__container]}>
      <Text style={[formStyles.form__date__title]}>
        {formatName(componentTitle)}:
      </Text>
      <TextInput
        style={[
          inputStyles.input__component,
          voiceStyles.voice__input__container,
        ]}
        multiline
        numberOfLines={10}
        // value={formatName(speechedValue, true)}
        value={formatName(activityState.details, true)}
        onChangeText={handleChange}
        // onTouchEnd={(e) => e.currentTarget.blur()}
        keyboardType="url"
      />
      <Pressable
        style={[
          formStyles.form__date__icon,
          isRecording
            ? voiceStyles.voice__mic__off
            : voiceStyles.voice__mic__on,
        ]}
        onPress={isRecording ? stopRecording : startRecording}
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
