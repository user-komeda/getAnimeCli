import {Command, Flags} from '@oclif/core'
import axios from 'axios'
import * as csvWriter from 'csv-writer'
import csvObject from '../../types/csvObject'
import header from '../../types/header'
// eslint-disable-next-line no-promise-executor-return

export default class ExportCsv extends Command {
  static description = 'Say hello'

  private baseUrl: URL = new URL('https://ja.wikipedia.org/w/api.php?')
  private year = ''
  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static args = [{name: 'data'}]

  static flags = {
    content: Flags.string({options: ['title', 'en-title']}),
  }

  async run(): Promise<void> {
    const {args} = await this.parse(ExportCsv)
    const dates: string[] = args.data.split(',')
    const headers: Array<header> = [
      {
        id: 'id',
        title: 'ID',
      },
      {id: 'name', title: 'NAME'},
    ]
    const csvObject: Array<csvObject> = []
    dates.sort()
    const writer = csvWriter.createObjectCsvWriter({
      path: 'c://Users/user/Downloads/test1.csv',
      header: headers,
      encoding: 'utf8',
      append: false,
    })

    for (const [index, data] of dates.entries()) {
      const rowData: csvObject = {
        id: index,
        name: data,
      }
      csvObject.push(rowData)
    }

    writer
    .writeRecords(csvObject)
    .then(() => {
      this.log('sucsess')
    })
    .catch((error: string | undefined) => {
      this.log(error)
    })
  }
}
