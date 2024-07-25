const { edenAiApiKey } = useRuntimeConfig()
const EdenV2Endpoint = 'https://api.edenai.run/v2'

export type StoryPieces = {
  names: string[] | null;
  places: string[] | null;
  verbs: string[] | null;
  adverbs: string[] | null;
  adjectives: string[] | null;
}

type EdenResponse = {
  openai: {
    generated_text: string
    message: EdenMessage[];
    status: string;
    cost: number;
  }
} | undefined

type EdenMessage = {
  role: string;
  message: string;
}

if (!edenAiApiKey) {
  throw createError('Missing Api Key');
}
const edenApiHeader = {authorization: `Bearer ${edenAiApiKey}`}

export function getStory(pieces: Record<string, string[]>) {
  const keys = Object.keys(pieces);
  const storyComponents = keys.filter(p => pieces[p]).map((i) => `${i} ${pieces[i].join(', ')}`).join(' and the ');
  const message = `Tell me a short funny story including the ${storyComponents}.`
  return sendChatMessage(message).then((resp) => {
    return resp?.openai?.generated_text || null
  })
}

function sendChatMessage(message: string) {
  const url = `${EdenV2Endpoint}/text/chat`
  const headers: HeadersInit = {
    ...edenApiHeader,
    accept: 'application/json',
    'content-type': 'application/json'
  }
  const body = {
    "response_as_dict": true,
    "attributes_as_list": false,
    "show_base_64": true,
    "show_original_response": true,
    "temperature": 0,
    "max_tokens": 1000,
    "providers": [
      "openai"
    ],
    text: message
  }
  return $fetch(url, {
    headers,
    method: 'POST',
    body
  }).then((res: EdenResponse) => {
    return res || null
  }).catch((e) => {
    console.log('Error sending chat message', { error: e.response });
    return null
  })
}
