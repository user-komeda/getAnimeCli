import voiceActorObject from '@type/VoiceActorObject'
import { wikiTextParseVoiceActor } from './wikiTextParse'
const getVoiceActor = (
  text: string,
  content: string
): Array<voiceActorObject> => {
  return wikiTextParseVoiceActor(text, content)
}

export default getVoiceActor
