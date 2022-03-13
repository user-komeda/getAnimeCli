import { Command, Flags } from '@oclif/core'
import * as csvWriter from 'csv-writer'
import csvObject from '../types/csvObject'
import header from '../types/header'

/**
 * 入力された引数を使用しcsvを出力
 */
export default class ExportCsv extends Command {
  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static args = [{ name: 'data' }]

  static flags = {
    content: Flags.string({ options: ['title', 'en-title'] }),
  }

  /**
   * メイン処理
   */
  async run(): Promise<void> {
    this.log('export')
    const { args } = await this.parse(ExportCsv)
    // データをカンマ区切りにする
    const dates: string[] = args.data.split(',')
    this.log(...dates)
    // scvのヘッダ情報
    const headers: Array<header> = [
      {
        id: 'id',
        title: 'ID',
      },
      { id: 'name', title: 'NAME' },
    ]

    // csvBodyのデータ
    const csvObject: Array<csvObject> = []
    dates.sort()

    // csv書き込み設定
    const writer = csvWriter.createObjectCsvWriter({
      path: 'c://Users/user/Downloads/test1.csv',
      header: headers,
      encoding: 'utf8',
      append: false,
    })

    // csvBodyにデータを追加
    for (const [index, data] of dates.entries()) {
      const rowData: csvObject = {
        id: index,
        name: data,
      }
      csvObject.push(rowData)
    }

    // csvを書き込み
    writer
      .writeRecords(csvObject)
      .then(() => {
        this.log('success')
      })
      .catch((error: string | undefined) => {
        this.log(error)
      })
  }
}
