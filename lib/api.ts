export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type ChatResult = {
  response: string;
  sources?: string[];
  confidence?: number | null;
};

export async function chat(message: string, signal?: AbortSignal): Promise<ChatResult> {
  const attempt = async (): Promise<ChatResult> => {
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 30000);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        signal: signal || ac.signal,
        credentials: 'omit',
      });
      if (!res.ok) throw new Error(await res.text());
      return (await res.json()) as ChatResult;
    } finally {
      clearTimeout(timeout);
    }
  };

  try {
    return await attempt();
  } catch {
    // brief retry once
    return await attempt();
  }
}

export async function getSettings(signal?: AbortSignal): Promise<{ persona_name?: string } | null> {
  try {
    const res = await fetch(`${API_URL}/settings/assistant`, { signal });
    if (!res.ok) return null;
    return (await res.json()) as any;
  } catch {
    return null;
  }
}

export async function getHealth(signal?: AbortSignal): Promise<boolean> {
  try {
    const ac = new AbortController();
    const timeout = setTimeout(() => ac.abort(), 8000);
    const res = await fetch(`${API_URL}/health`, { signal: signal || ac.signal });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

