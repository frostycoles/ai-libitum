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
  const storyComponents = keys.filter(p => pieces[p]).map((i) => `${i} ${pieces[i].map((t, index) => `${i.slice(0, i.length - 1)}${index}`)}`).join(' and the ');
  const message = `Tell me a short funny story using placeholders for the ${storyComponents}.`
  console.log('frostycoles', { message });
  return sendChatMessage(message).then((resp) => {
    return resp?.openai?.generated_text ? replacePlaceholders(resp.openai.generated_text, pieces) : null
  })
}

function replacePlaceholders(story: string, pieces: Record<string, string[]>) {
  const placeholders = Object.entries(pieces).reduce((a, [key, items]) => {
    const p = items.map((it, ind) => [` ${key.slice(0, key.length - 1)}${ind}`, ` <span class="${key.slice(0, key.length - 1)}">${it}</span>`])
    a.push(...p)
    return a
  }, ([] as string[][]))
  placeholders.forEach(i => {
    const [p, n] = i
    story = story.replaceAll(p, n)
  });
  return story
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
