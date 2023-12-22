import { Command, Flags } from '@oclif/core'
import * as inquirer from 'inquirer'
import axios from 'axios'
import cliUx from 'cli-ux'
import { sleep } from '../Util/sleep'
import { BASE_URL_JA } from '../const'
import getPageData from '../Util/getPageData'
import AnimeData from 'src/types/AnimeData'
import * as fs from 'fs'
import path = require('path')

/**
 * anime取得
 */
export default class GetAnime extends Command {
  static description = 'Say hello'

  private baseUrl: URL = new URL(BASE_URL_JA)
  private year = ''
  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    content: Flags.string({ options: ['title', 'en-title'] }),
  }

  static args = [{ name: 'person', description: 'Person to say hello to' }]

  /**
   * メイン処理
   */
  async run(): Promise<void> {
    const { flags } = await this.parse(GetAnime)
    let stage = flags.content
    if (!stage) {
      const responses = await inquirer.prompt([
        {
          name: 'content',
          message: 'select a content',
          type: 'list',
          choices: [{ name: 'title' }, { name: 'production' }],
        },
      ])
      stage = responses.content
    }

    let category = ''

    switch (stage) {
      case 'title':
        console.time('a')
        this.year = await cliUx.prompt('Please enter the year you want to get')
        this.log('anime')
        category = `Category:${this.year}年のテレビアニメ`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', 'tvAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('a')
        await sleep(3_000)

        console.time('b')
        this.log('web')
        category = `Category:${this.year}年のWebアニメ`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', 'webAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('b')
        await sleep(3_000)

        console.time('c')
        this.log('movie')
        category = `Category:${this.year}年のアニメ映画`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', 'movieAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('c')
        await sleep(3_000)

        console.time('d')
        this.log('ova')
        category = `Category:${this.year}年のOVA`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', 'ovaAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('d')
        await sleep(3_000)
        break

      default:
        break
    }
  }

  /**
   * @param {string} url url
   * @return {string} titlelyiiy
   */
  private async getAnimeData(url: URL): Promise<AnimeData[]> {
    const animeDataList: Array<AnimeData> = []
    await axios.get(url.toString()).then(async (response) => {
      const { categorymembers } = response.data.query
      for (const categorymember of categorymembers) {
        const pageData = await getPageData(categorymember.pageid)
        if (pageData !== null) {
          animeDataList.push(pageData)
        }
      }
    })
    return animeDataList
  }

  // private getPageId(page: number): string

  /**
   * リクエストURLを作成
   *
   * @param {string} category category
   */
  private buildUrl(category: string): void {
    this.baseUrl.searchParams.append('action', 'query')
    this.baseUrl.searchParams.append('list', 'categorymembers')
    this.baseUrl.searchParams.append('cmtitle', category)
    this.baseUrl.searchParams.append('cmlimit', '999')
    this.baseUrl.searchParams.append('format', 'json')
  }
}
