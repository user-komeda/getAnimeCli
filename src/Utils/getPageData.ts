import axios from 'axios'
import { BASE_URL_JA } from '../const'
import getCharacterList from './getCharacterList'
import getEpisodes from './getEpisode'
import getVoiceActor from './getVoiceActor'
import getStaffList from './getStaffList'
import getSound from './getSound'
import AnimeData from '@type/AnimeData'
import getTelevisedBroadcastDate from './getTelevisedBroadcastDate'

const getPageData = async (pageId: string): Promise<AnimeData> => {
  const requestUrl = convertPageIdToUrl(pageId)
  const animeData: AnimeData = await sendRequest(requestUrl)
  return animeData
}

/**
 *pageIdからURL生成
 *
 * @param {string} pageId pageId
 * @return {string} buildUrl
 */
const convertPageIdToUrl = (pageId: string): string => {
  return buildUrl(pageId)
}

/**
 * url作成
 *
 * @param {string} value クエリパラメータ
 * @return {string} url
 */
const buildUrl = (value: string): string => {
  const buildUrl = new URL(BASE_URL_JA)

  buildUrl.searchParams.append('format', 'json')
  buildUrl.searchParams.append('action', 'parse')
  buildUrl.searchParams.append('pageid', value)
  buildUrl.searchParams.append('redirects', 'true')
  return buildUrl.toString()
}

const sendRequest = async (requestUrl: string): Promise<AnimeData> => {
  const result = await axios.get(requestUrl).then((response) => {
    const title = response.data.parse.title
    const pageId = response.data.parse.pageid
    const parseText = response.data.parse.text['*']
    const televisedBroadcastDate = getTelevisedBroadcastDate(parseText, [
      '放送期間',
      '発表期間',
      '封切日',
      '公開',
    ])
    const characterList = getCharacterList(parseText, '登場人物[編集]')
    const episodeList = getEpisodes(parseText, '各話リスト[編集]')
    const voiceActorList = getVoiceActor(parseText, '登場人物[編集]')
    const staffList = getStaffList(parseText, 'スタッフ[編集]')
    const soundList = getSound(parseText, '主題歌[編集]')
    const animeData: AnimeData = {
      pageId,
      title,
      televisedBroadcastDate,
      characterList,
      episodeList,
      voiceActorList,
      soundList,
      staffList,
    }
    return animeData
  })
  return result
}
export default getPageData
