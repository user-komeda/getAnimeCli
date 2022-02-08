import { Command, Flags } from '@oclif/core'
// import fetch from 'node-fetch'
import axios, { AxiosResponse } from 'axios'
import { JSDOM } from 'jsdom'
import cliUx from 'cli-ux'
import * as inquirer from 'inquirer'

const sleep = (sec: number) => new Promise(resolve => setTimeout(resolve, sec))

/**
 *
 */
export default class Scrape extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']
  /**
   *
   */
  public async run (): Promise<void> {
    const responses: any = await inquirer.prompt([
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
    const response: AxiosResponse<any, any> = await axios.get(url)
    const html: string = response.data
    const dom: JSDOM = new JSDOM(html)
    const document: Document = dom.window.document
    const test: NodeListOf<Element> = document.querySelectorAll(
      '.table > tbody > tr >td > a'
    )
    const array: (string | undefined)[] = [...test].map(test => {
      return test.textContent?.trim()
    })

    for (const data of array) {
      const response = await axios.get(baseUrl + 'works/' + data + '/info')
      const html: string = response.data
      const dom: JSDOM = new JSDOM(html)
      const document = dom.window.document
      const test: Element = document.querySelectorAll('.fw-bold+div')[1]

      console.log(test.textContent?.trim())
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000)
    }

    console.log(array)
  }
}
