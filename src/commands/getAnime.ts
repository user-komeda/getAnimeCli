import { wikiTextParseEpisode } from './../Util/wikiTextParse'
import { Command, Flags } from '@oclif/core'
import * as inquirer from 'inquirer'
import axios from 'axios'
import cliUx from 'cli-ux'
import { sleep } from '../Util/sleep'
import { getTopicNumber } from '../Util/wikiTextParse'

/**
 * anime取得
 */
export default class GetAnime extends Command {
  static description = 'Say hello'

  private baseUrl: URL = new URL('https://ja.wikipedia.org/w/api.php?')
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
        this.year = await cliUx.prompt('Please enter the year you want to get')
        this.log('anime')
        category = `Category:${this.year}年のテレビアニメ`
        this.buildUrl(category)
        this.getAnimeTitles(this.year, this.baseUrl)
        await sleep(10_000)

        this.log('web')
        category = 'Category:2020年のWebアニメ'
        this.buildUrl(category)
        this.getAnimeTitles(this.year, this.baseUrl)
        await sleep(10_000)

        this.log('movie')
        category = `Category:${this.year}年のアニメ映画`
        this.buildUrl(category)
        this.getAnimeTitles(this.year, this.baseUrl)
        await sleep(10_000)

        this.log('ova')
        category = `Category:${this.year}年のOVA`
        this.buildUrl(category)
        this.getAnimeTitles(this.year, this.baseUrl)
        await sleep(10_000)
        break

      default:
        break
    }
  }

  /**
   * @param {string} year year
   * @param {string} url url
   * @return {string} title
   */
  private getAnimeTitles(year: string, url: URL): string {
    const test =
      'https://ja.wikipedia.org/w/api.php?action=parse&pageid=2469435&format=json&prop=text&wrapoutputclass&disablelimitreport&disableeditsection'
    this.log(url.toString())
    axios
      .get(test)
      .then((response) => {
        const topicNumber = getTopicNumber(
          JSON.stringify(response.data.parse.text['*']),
          '各話リスト'
        )
        wikiTextParseEpisode(
          JSON.stringify(response.data.parse.text['*']),
          topicNumber
        )
      })
      .catch((error) => {
        this.log(error)
      })

    return ''
  }

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
