import { sleep } from '@utils/sleep'
import { Command } from '@oclif/core'
import axios, { AxiosResponse } from 'axios'
import { JSDOM } from 'jsdom'
import { input, select } from '@inquirer/prompts'

/**
 * スクレイプ処理
 */
export default class Scrape extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  /**
   * メイン処理
   */
  public async run(): Promise<void> {
    const responses = await select({
      message: 'select a content',
      choices: [
        { name: 'winter', value: 'winter' },
        { name: 'spring', value: 'spring' },
        { name: 'summer', value: 'summer' },
        { name: 'autumn', value: 'autumn' },
      ],
    })
    const year = await input({
      message: 'Please enter the year you want to get',
    })
    const url = `https://annict.com/db/works?season_slugs%5B%5D=${year}-${responses}&commit=%E6%A4%9C%E7%B4%A2%E3%81%99%E3%82%8B`
    const baseUrl = 'https://annict.com/'
    const response: AxiosResponse<string, string> = await axios.get(url)
    const html: string = response.data
    const dom: JSDOM = new JSDOM(html)
    const { document } = dom.window
    const test: NodeListOf<Element> = document.querySelectorAll(
      '.table > tbody > tr >td > a'
    )
    const array: (string | undefined)[] = [...test].map((test) =>
      test.textContent?.trim()
    )

    for (const data of array) {
      this.getScrapeData(baseUrl, data)
      sleep(5000)
    }
  }

  /**
   *
   * @param {string} baseUrl baseUrl
   * @param {string} data data
   * @return {Element} Element
   */
  private async getScrapeData(baseUrl: string, data: string | undefined) {
    const response = await axios
      .get(baseUrl + 'works/' + data + '/info')
      .then((response) => response)
    const html: string = response.data
    const dom: JSDOM = new JSDOM(html)
    const { document } = dom.window
    const test: Element = document.querySelectorAll('.fw-bold+div')[1]
    return test
  }
}
