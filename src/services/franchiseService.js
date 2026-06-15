import axios from "axios";

const apiUrl = import.meta.env.VITE_FRANCHISE_API_URL;
const useMockApi = String(import.meta.env.VITE_USE_MOCK_API ?? "true") === "true" || !apiUrl;
const timeout = Number(import.meta.env.VITE_API_TIMEOUT_MS || 10000);

const client = axios.create({
  baseURL: apiUrl || undefined,
  timeout,
  headers: { "Content-Type": "application/json" },
});

function mockSubmit(payload, signal) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      resolve({
        id: `CNES-${Date.now()}`,
        receivedAt: new Date().toISOString(),
        city: payload.city,
      });
    }, 900);

    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/**
 * @param {import("../data/types").FranchiseEnquiry} payload
 * @param {{ signal?: AbortSignal }} options
 */
export async function submitFranchiseEnquiry(payload, { signal } = {}) {
  if (useMockApi) return mockSubmit(payload, signal);
  const response = await client.post("", payload, { signal });
  return response.data;
}
