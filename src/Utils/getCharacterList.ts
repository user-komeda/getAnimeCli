import { wikiTextParseCharacter } from './wikiTextParse'

/**
 * characterList取得
 *
 * @param {string} text text
 * @param {string} content content
 * @return {Array<string>} characterList
 */
const getCharacterList = (text: string, content: string): Array<string> => {
  return wikiTextParseCharacter(text, content)
}

export default getCharacterList
