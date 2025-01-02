import EpisodeObject from '@type/EpisodeObject'
import { wikiTextParseEpisode } from './wikiTextParse'

/**
 * episodeList取得
 * @param {string} text text
 * @param {string} content context
 * @return {Array<EpisodeObject>} episodeList
 */
const getEpisodes = (text: string, content: string): Array<EpisodeObject> => {
  return wikiTextParseEpisode(text, content)
}

export default getEpisodes
