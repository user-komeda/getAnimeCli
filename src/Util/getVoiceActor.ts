import { wikiTextParseVoiceActor } from './wikiTextParse'
const getVoiceActor = (text: string, content: string): string => {
  return wikiTextParseVoiceActor(text, content)
}

export default getVoiceActor
