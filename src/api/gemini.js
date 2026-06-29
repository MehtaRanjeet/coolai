export async function askAI(messages, systemPrompt = '') {
  const response = await fetch('https://coolai-server.onrender.com/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, systemPrompt }),
  })
  const data = await response.json()
  return data.text
}