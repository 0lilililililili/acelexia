/** A concrete speaking example, never the answer itself. */
export function answerFormat(subject: string, prompt: string, answer: string): string {
  if (subject === "math") {
    if (/^\d{1,2}:\d{2}\s*(?:am|pm)?$/i.test(answer)) return "3:30 pm";
    if (/^\d+\/\d+$/.test(answer)) return "one half (1/2)";
    if (/%$/.test(answer)) return "25 percent (25%)";
    if (/°$/.test(answer)) return "90 degrees (90°)";
    if (/^\$/.test(answer)) return "2 dollars 50 cents ($2.50)";
    if (/\b(?:am|pm)\b/i.test(answer)) return "half past three (3:30 pm)";
    if (/^\d+(?:\.\d+)?$/.test(answer)) return "a number, like 12";
    return "a short number or time, like 12 or 3:30 pm";
  }
  if (subject === "chi") return "read the shown word aloud";
  if (/\s/.test(answer.trim())) return "say the words, like 'the blue bird'";
  return "say the word, like 'cat'";
}