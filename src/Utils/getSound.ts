import { wikiTextParseSound } from './wikiTextParse'

const getSound = (text: string, content: string): Array<string> => {
  return wikiTextParseSound(text, content)
}

export default getSound
