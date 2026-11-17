export type VoiceParams = {
  pitch: number;
  formant: number;
  robot: number;
  reverb: number;
  echo: number;
  warmth: number;
  gate: number;
  gain: number;
};

export type VoicePreset = {
  name: string;
  description: string;
  params: VoiceParams;
};

export const DEFAULT_PARAMS: VoiceParams = {
  pitch: 0,
  formant: 1,
  robot: 0,
  reverb: 0,
  echo: 0,
  warmth: 0.35,
  gate: 0.02,
  gain: 1,
};

export const PRESETS: VoicePreset[] = [
  {
    name: "Natural",
    description: "Clean voice with light warmth",
    params: { ...DEFAULT_PARAMS, warmth: 0.25, gate: 0.015 },
  },
  {
    name: "Deep",
    description: "Lower pitch, darker timbre",
    params: {
      pitch: -4,
      formant: 0.86,
      robot: 0,
      reverb: 0.12,
      echo: 0,
      warmth: 0.55,
      gate: 0.02,
      gain: 1,
    },
  },
  {
    name: "Bright",
    description: "Higher, lighter character",
    params: {
      pitch: 3.5,
      formant: 1.18,
      robot: 0,
      reverb: 0,
      echo: 0,
      warmth: 0.2,
      gate: 0.018,
      gain: 1,
    },
  },
  {
    name: "Feminine",
    description: "Higher pitch + lifted formants",
    params: {
      pitch: 5,
      formant: 1.22,
      robot: 0,
      reverb: 0.08,
      echo: 0,
      warmth: 0.18,
      gate: 0.02,
      gain: 1,
    },
  },
  {
    name: "Masculine",
    description: "Lower pitch, warmer body",
    params: {
      pitch: -3.5,
      formant: 0.88,
      robot: 0,
      reverb: 0.1,
      echo: 0,
      warmth: 0.5,
      gate: 0.02,
      gain: 1,
    },
  },
  {
    name: "Robot",
    description: "Classic robotic carrier voice",
    params: {
      pitch: -1,
      formant: 1.05,
      robot: 0.85,
      reverb: 0,
      echo: 0.15,
      warmth: 0.1,
      gate: 0.02,
      gain: 1,
    },
  },
  {
    name: "Radio Host",
    description: "Broadcast warmth + room",
    params: {
      pitch: -1.5,
      formant: 0.95,
      robot: 0,
      reverb: 0.22,
      echo: 0,
      warmth: 0.7,
      gate: 0.02,
      gain: 1.05,
    },
  },
  {
    name: "Alien",
    description: "Wide stretch + echo",
    params: {
      pitch: 7,
      formant: 1.45,
      robot: 0.35,
      reverb: 0.18,
      echo: 0.35,
      warmth: 0.15,
      gate: 0.02,
      gain: 1,
    },
  },
  {
    name: "Chipmunk",
    description: "High novelty pitch",
    params: {
      pitch: 9,
      formant: 1.35,
      robot: 0,
      reverb: 0,
      echo: 0,
      warmth: 0.1,
      gate: 0.02,
      gain: 1,
    },
  },
];
