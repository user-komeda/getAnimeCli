import { Command, Flags } from '@oclif/core'
import axios from 'axios'
import { select } from '@inquirer/prompts'
import { input } from '@inquirer/prompts'
import { sleep } from '@utils/sleep'
import { BASE_URL_JA } from '../const'
import getPageData from '@utils/getPageData'
import AnimeData from '@type/AnimeData'
import fs from 'fs'
import path from 'path'

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

  /**
   * メイン処理
   */
  async run(): Promise<void> {
    const { flags } = await this.parse(GetAnime)
    let stage = flags.content
    if (!stage) {
      stage = await select({
        message: 'select a content',
        choices: [
          { name: 'title', value: 'title' },
          { name: 'en-title', value: 'en-title' },
        ],
      })
    }

    switch (stage) {
      case 'title': {
        let category = ''
        this.year = await input({
          message: 'Please enter the year you want to get',
        })
        console.time('a')
        this.log('anime')
        category = `Category:${this.year}年のテレビアニメ`
        fs.mkdirSync(path.join(process.cwd(), 'dist', this.year), {
          recursive: true,
        })
        this.buildUrl(category)
        console.log(this.baseUrl)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', this.year, 'tvAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('a')
        await sleep(3_000)

        console.time('b')
        this.log('web')
        category = `Category:${this.year}年のWebアニメ`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', this.year, 'webAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('b')
        await sleep(3_000)

        console.time('c')
        this.log('movie')
        category = `Category:${this.year}年のアニメ映画`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', this.year, 'movieAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('c')
        await sleep(3_000)

        console.time('d')
        this.log('ova')
        category = `Category:${this.year}年のOVA`
        this.buildUrl(category)
        fs.writeFileSync(
          path.join(process.cwd(), 'dist', this.year, 'ovaAnime.json'),
          JSON.stringify(await this.getAnimeData(this.baseUrl))
        )
        console.timeEnd('d')
        await sleep(3_000)
        break
      }

      case 'en-title':
        console.error('failed')
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
