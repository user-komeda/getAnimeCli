import { Command, Flags } from '@oclif/core'
import { BASE_URL_JA } from '../const'
import axios from 'axios'
import getCharacterList from '../Util/getCharacterList'
import getEpisodes from '../Util/getEpisode'

/**
 * anime取得
 */
export default class GetPageData extends Command {
  static description = 'Say hello'

  private baseUrl: URL = new URL(BASE_URL_JA)
  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    pageid: Flags.string({ required: true }),
  }

  static args = [{ name: 'person', description: 'Person to say hello to' }]

  /**
   * メイン処理
   */
  async run(): Promise<void> {
    const { flags } = await this.parse(GetPageData)
    const { pageid } = flags
    const requestUrl = this.convertPageIdToUrl(pageid)
    axios
      .get(requestUrl)
      .then((response) => {
        const parseText = response.data.parse.text['*']
        getCharacterList(parseText, '登場人物[編集]')
        getEpisodes(parseText, '各話リスト[編集]')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  /**
   *pageIdからURL生成
   *
   * @param {string} pageId pageId
   * @return {string} buildUrl
   */
  private convertPageIdToUrl(pageId: string): string {
    return this.buildUrl(pageId)
  }

  /**
   * url作成
   *
   * @param {string} value クエリパラメータ
   * @return {string} url
   */
  private buildUrl(value: string): string {
    const buildUrl = this.baseUrl

    buildUrl.searchParams.append('format', 'json')
    buildUrl.searchParams.append('action', 'parse')
    buildUrl.searchParams.append('pageid', value)
    return buildUrl.toString()
  }
}
