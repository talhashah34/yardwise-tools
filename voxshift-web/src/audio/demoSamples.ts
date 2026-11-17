/** Embedded demo clips so preview works even before static assets sync. */
import { contentSample } from "./demoSampleContent";
import { targetSample } from "./demoSampleTarget";
import { resultSample } from "./demoSampleResult";

export const demoSamples = {
  content: contentSample,
  target: targetSample,
  result: resultSample,
} as const;
