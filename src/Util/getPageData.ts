import { BASE_URL_JA } from '../const'
import axios from 'axios'
import getCharacterList from './getCharacterList'
import getEpisodes from './getEpisode'
import getVoiceActor from './getVoiceActor'
import getStaffList from './getStaffList'
import getSound from './getSound'
import { sleep } from '../Util/sleep'

/**
 *
 * @param {string} pageId pageId
 */
const getPageData = (pageId: string) => {
  const baseUrl: URL = new URL(BASE_URL_JA)

  /**
   * メイン処理
   */

  const requestUrl = convertPageIdToUrl(baseUrl, pageId)
  axios
    .get(requestUrl)
    .then(async (response) => {
      const parseText = response.data.parse.text['*']
      getCharacterList(parseText, '登場人物[編集]')
      sleep(2000)
      getEpisodes(parseText, '各話リスト[編集]')
      sleep(2000)
      getVoiceActor(parseText, '登場人物[編集]')
      sleep(2000)
      getStaffList(parseText, 'スタッフ[編集]')
      sleep(2000)
      getSound(parseText, '主題歌[編集]')
      sleep(2000)
    })
    .catch((error) => {
      console.log(error.message)
    })
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
