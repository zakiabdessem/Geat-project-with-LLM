/**
 * Client for a local Meta Llama-family model via [Ollama](https://ollama.com).
 * Pull a model once: `ollama pull llama3.2` (or `llama3.1`, `llama3`, etc.).
 */

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

function apiRoot(): string {
  const fromEnv = import.meta.env.VITE_OLLAMA_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return "/ollama";
  return "http://127.0.0.1:11434";
}

export type LocalLlamaChatOptions = {
  model?: string;
  signal?: AbortSignal;
};

export type LocalLlamaChatResult = {
  reply: string;
  model: string;
  doneReason?: string;
};

type OllamaChatResponse = {
  model?: string;
  message?: { role: string; content: string };
  done_reason?: string;
  error?: string;
};

/**
 * Sends messages to Ollama's `/api/chat` endpoint (non-streaming).
 */
export async function chatWithLocalLlama(
  messages: ChatMessage[],
  options: LocalLlamaChatOptions = {},
): Promise<LocalLlamaChatResult> {
  const model = options.model ?? "llama3.2";
  const root = apiRoot();
  const res = await fetch(`${root}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: options.signal,
    body: JSON.stringify({
      model,
      messages,
      stream: false,
    }),
  });

  const data = (await res.json()) as OllamaChatResponse;

  if (!res.ok) {
    const msg = data.error ?? res.statusText ?? "Request failed";
    throw new Error(msg);
  }

  const content = data.message?.content?.trim();
  if (!content) {
    throw new Error(data.error ?? "Empty response from local model");
  }

  return {
    reply: content,
    model: data.model ?? model,
    doneReason: data.done_reason,
  };
}
