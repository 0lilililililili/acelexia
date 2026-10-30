export type TranscriptionConfig = {
  baseURL: string;
  apiKey: string;
  model: string;
  maxFileBytes: number;
  audioOnly: boolean;
};

export async function transcribe(
  config: TranscriptionConfig,
  file: File,
  options: {
    buffered?: boolean;
    language?: string;
    dialect?: "zh-HK"|"zh-CN";
    signal?: AbortSignal;
  } = {},
) {
  if (!file.size || file.size > config.maxFileBytes) throw new Error("Invalid audio file size");
  if (!file.type.startsWith("audio/") && (config.audioOnly || !file.type.startsWith("video/"))) {
    throw new Error("Unexpected media MIME type");
  }
  const form = new FormData();
  form.append("model", config.model);
  form.append("file", file, file.name);
  form.append("response_format", "json");
  if (!options.buffered) form.append("stream", "true");
  if (options.language) form.append("language", options.language);
  if (options.dialect) form.append("prompt", options.dialect === "zh-HK" ? "This is a child reading Chinese words in Cantonese (Hong Kong). Transcribe the actual speech in Traditional Chinese. Do not translate Cantonese to English or invent words." : "This is a child reading Chinese words in Mandarin. Transcribe the actual speech in Chinese. Do not translate to English or invent words.");
  return fetch(`${config.baseURL}/v1/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}` },
    body: form,
    ...(options.signal ? { signal: options.signal } : {}),
  });
}
