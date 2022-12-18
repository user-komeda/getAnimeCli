import { wikiTextParseCharacter } from './wikiTextParse'

/**
 * characterList取得
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} characterList
 */
const getCharacterList = (text: string, content: string): string => {
  return wikiTextParseCharacter(text, content)
}

export default getCharacterList
