import { choiceFromSpeech, matches } from "./answer-match";

/** MC answers are final on the first attempt; open answers may be retried. */
export function answerOutcome(text: string, answer: string, choices?: string[], spoken = false): "correct" | "wrong" | "retry" {
  const isMc = !!choices?.length;
  const value = spoken && isMc ? (choiceFromSpeech(text, choices) ?? text) : text;
  if (matches(value, answer)) return "correct";
  return isMc ? "wrong" : "retry";
}