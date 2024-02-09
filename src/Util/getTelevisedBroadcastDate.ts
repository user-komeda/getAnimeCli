import { wikiTextParseTelevisedBroadcastDate } from './wikiTextParse'

/**
 * 放送期間を取得
 *
 * @param {string} text text
 * @param {Array<string>} content content
 * @return {string} televisedBroadcastDate
 */
const getTelevisedBroadcastDate = (
  text: string,
  content: Array<string>
): string => {
  return wikiTextParseTelevisedBroadcastDate(text, content)
}

export default getTelevisedBroadcastDate
