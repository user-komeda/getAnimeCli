import {Command, Flags} from '@oclif/core'
import * as inquirer from 'inquirer'
import axios from 'axios'
import cliUx from 'cli-ux'
// eslint-disable-next-line no-promise-executor-return
const sleep = (sec: number) => new Promise(resolve => setTimeout(resolve, sec))

export default class Hello extends Command {
  static description = 'Say hello'

  private baseUrl: URL = new URL('https://ja.wikipedia.org/w/api.php?')
  private year = ''
  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    content: Flags.string({options: ['title', 'en-title']}),
  }

  static args = [{name: 'person', description: 'Person to say hello to'}]

  async run(): Promise<void> {
    const {flags} = await this.parse(Hello)
    let stage = flags.content
    if (!stage) {
      const responses: any = await inquirer.prompt([
        {
          name: 'content',
          message: 'select a content',
          type: 'list',
          choices: [{name: 'title'}, {name: 'production'}],
        },
      ])
      stage = responses.content
    }

    switch (stage) {
    case 'title':
      this.year = await cliUx.prompt('Please enter the year you want to get')
      this.log('anime')
      let category = `Category:${this.year}年のテレビアニメ`
      this.buildUrl(category)
      this.getAnimeTitles(this.year, this.baseUrl)
      await sleep(10000)

      this.log('web')
      category = `Category:2020年のWebアニメ`
      this.buildUrl(category)
      this.getAnimeTitles(this.year, this.baseUrl)
      await sleep(10000)

      this.log('movie')
      category = `Category:${this.year}年のアニメ映画`
      this.buildUrl(category)
      this.getAnimeTitles(this.year, this.baseUrl)
      await sleep(10000)

      this.log('ova')
      category = `Category:${this.year}年のOVA`
      this.buildUrl(category)
      this.getAnimeTitles(this.year, this.baseUrl)
      await sleep(10000)
      break
    default:
      break
    }
  }

  private getAnimeTitles(year: string, url: URL): string {
    this.log(url.toString())
    axios
    .get(url.toString())
    .then(response => {
      const categorymembers = response.data.query.categorymembers
      this.log(categorymembers.length)
      for (const categorymember of categorymembers) {
        this.log(categorymember.title)
      }
    })
    .catch(error => {
      this.log(error)
    })

    return ''
  }

  private buildUrl(category: string): void {
    this.baseUrl.searchParams.append('action', 'query')
    this.baseUrl.searchParams.append('list', 'categorymembers')
    this.baseUrl.searchParams.append('cmtitle', category)
    this.baseUrl.searchParams.append('cmlimit', '999')
    this.baseUrl.searchParams.append('format', 'json')
  }
}
