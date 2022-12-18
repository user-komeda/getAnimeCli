import { wikiTextParseSound } from '../Util/wikiTextParse'
const getSound = (text: string, content: string): string => {
  return wikiTextParseSound(text, content)
}

export default getSound
