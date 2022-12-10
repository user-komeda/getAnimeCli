import { sleep } from './../Util/sleep'
import { Command } from '@oclif/core'
import axios, { AxiosResponse } from 'axios'
import { JSDOM } from 'jsdom'
import cliUx from 'cli-ux'
import * as inquirer from 'inquirer'

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
    const responses = await inquirer.prompt([
      {
        name: 'content',
        message: 'select a content',
        type: 'list',
        choices: [
          { name: 'winter' },
          { name: 'spring' },
          { name: 'summer' },
          { name: 'autumn' },
        ],
      },
    ])
    const year = await cliUx.prompt('Please enter the year you want to get')
    const url = `https://annict.com/db/works?season_slugs%5B%5D=${year}-${responses.content}&commit=%E6%A4%9C%E7%B4%A2%E3%81%99%E3%82%8B`
    const baseUrl = 'https://annict.com/'
    console.log(url)
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

    console.log(array)
  }

  /**
   *
   * @param {string} baseUrl baseUrl
   * @param {string} data data
   */
  private async getScrapeData(baseUrl: string, data: string | undefined) {
    const response = await axios
      .get(baseUrl + 'works/' + data + '/info')
      .then((response) => response)
    const html: string = response.data
    const dom: JSDOM = new JSDOM(html)
    const { document } = dom.window
    const test: Element = document.querySelectorAll('.fw-bold+div')[1]

    console.log(test.textContent)
    await sleep(5000)
  }
}
