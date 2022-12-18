import { BASE_URL_JA } from '../const'
import axios from 'axios'
import getCharacterList from './getCharacterList'
import getEpisodes from './getEpisode'
import getVoiceActor from './getVoiceActor'
import getStaffList from './getStaffList'
import getSound from './getSound'
import csvObject from '../types/csvObject'

/**
 *
 * @param {string} pageId pageId
 * @param {string} title title
 */
const getPageData = async (
  pageId: string,
  title: string
): Promise<csvObject> => {
  const baseUrl: URL = new URL(BASE_URL_JA)
  const csvObject: csvObject = {
    id: '',
    title: '',
    enTitle: '',
    episode: '',
    staff: '',
    character: '',
    sound: '',
    voiceActor: '',
  }
  /**
   * メイン処理
   */

  const requestUrl = convertPageIdToUrl(baseUrl, pageId)
  await axios
    .get(requestUrl)
    .then((response) => {
      const parseText = response.data.parse.text['*']
      const character = getCharacterList(parseText, '登場人物[編集]')
      const episode = getEpisodes(parseText, '各話リスト[編集]')
      const voiceActor = getVoiceActor(parseText, '登場人物[編集]')
      const staff = getStaffList(parseText, 'スタッフ[編集]')
      const sound = getSound(parseText, '主題歌[編集]')
      csvObject.id = pageId
      csvObject.title = title
      csvObject.character = character
      csvObject.episode = episode
      csvObject.voiceActor = voiceActor
      csvObject.staff = staff
      csvObject.sound = sound
    })
    .catch((error) => {
      console.log(error.message)
    })
  return csvObject
}

/**
 *pageIdからURL生成
 *
 * @param {URL} baseUrl baseUrl
 * @param {string} pageId pageId
 * @return {string} buildUrl
 */
const convertPageIdToUrl = (baseUrl: URL, pageId: string): string => {
  return buildUrl(baseUrl, pageId)
}

/**
 * url作成
 *
 * @param {URL} baseUrl baseUrl
 * @param {string} value value
 * @return {string} url
 */
const buildUrl = (baseUrl: URL, value: string): string => {
  const buildUrl = baseUrl

  buildUrl.searchParams.append('format', 'json')
  buildUrl.searchParams.append('action', 'parse')
  buildUrl.searchParams.append('pageid', value)
  return buildUrl.toString()
}

export default getPageData
