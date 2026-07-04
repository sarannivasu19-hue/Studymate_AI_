import { useRef, useState, useEffect } from "react";

export default function VoiceRecorder({
  language,
  onResult,
}) {
  const recognitionRef = useRef(null);

  const [listening, setListening] = useState(false);

  const languageMap = {
    English: "en-US",
    Tamil: "ta-IN",
    Hindi: "hi-IN",
    Telugu: "te-IN",
    Malayalam: "ml-IN",
    Kannada: "kn-IN",
    French: "fr-FR",
    German: "de-DE",
    Spanish: "es-ES",
    Japanese: "ja-JP",
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      languageMap[language] || "en-US";

    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      onResult(transcript);
    };

    recognitionRef.current = recognition;

    recognition.start();
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <button
        onClick={
          listening
            ? stopListening
            : startListening
        }
        style={{
          width: "170px",
          height: "170px",
          borderRadius: "50%",
          border: "none",
          background: listening
            ? "#EF4444"
            : "#2563EB",
          color: "white",
          fontSize: "65px",
          cursor: "pointer",
          transition: ".3s",
        }}
      >
        🎤
      </button>

      <h2
        style={{
          marginTop: "20px",
        }}
      >
        {listening
          ? "Listening..."
          : "Tap to Speak"}
      </h2>

      <p>
        Language : <b>{language}</b>
      </p>
    </div>
  );
}