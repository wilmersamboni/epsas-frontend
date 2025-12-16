export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export async function askOpenAI(messages: ChatMessage[], opts?: { model?: string; max_tokens?: number; temperature?: number; }): Promise<string> {
  const useProxy = import.meta.env.VITE_USE_PROXY === 'true';
  const model = opts?.model ?? 'gpt-3.5-turbo';
  const max_tokens = opts?.max_tokens ?? 600;
  const temperature = opts?.temperature ?? 0.7;

  if (useProxy) {
    // Call the serverless proxy endpoint
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model, max_tokens, temperature }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      const body = JSON.stringify(data);
      throw new Error(`Proxy /api/chat failed: ${resp.status} ${body}`);
    }

    return data.reply ?? '';
  }

  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key) throw new Error('VITE_OPENAI_API_KEY is not set in environment');

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, max_tokens, temperature }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`OpenAI request failed: ${resp.status} ${text}`);
  }

  const data = await resp.json();
  // Extract assistant content
  const content = data?.choices?.[0]?.message?.content;
  return content ?? '';
}
