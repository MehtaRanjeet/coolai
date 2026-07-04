import { apiFetch } from './client'

export async function askAI(messages, systemPrompt = '') {
  const response = await apiFetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages, systemPrompt }),
  })
  const data = await response.json()
  return data.text
}