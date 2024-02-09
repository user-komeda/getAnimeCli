import { wikiTextParseTelevisedBroadcastDate } from './wikiTextParse'

/**
 * 放送期間を取得
 *
 * @param {string} text text
 * @param {Array<String>} content content
 * @return {string} televisedBroadcastDate
 */
const getTelevisedBroadcastDate = (
  text: string,
  content: Array<string>
): string => {
  return wikiTextParseTelevisedBroadcastDate(text, content)
}

export default getTelevisedBroadcastDate
