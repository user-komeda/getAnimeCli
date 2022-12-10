import { wikiTextParseCharacter } from './wikiTextParse'

/**
 * characterList取得
 *
 * @param {string} text text
 * @param {string} content content
 */
const getCharacterList = (text: string, content: string) => {
  wikiTextParseCharacter(text, content)
}

export default getCharacterList
