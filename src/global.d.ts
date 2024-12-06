interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  // Array of SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  // The transcript of the recognized speech
  transcript: string;
  // Whether the result is final
  isFinal: boolean;
}