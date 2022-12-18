import * as csvWriter from 'csv-writer'
import csvObject from '../types/csvObject'

/**
 *
 * @param {Array<csvObject>} datas datas
 */
const exportCsv = (datas: Array<csvObject>) => {
  // scvのヘッダ情報
  const headers: Array<string> = [
    'id',
    'title',
    'en-title',
    'episode',
    'staff',
    'character',
    'sound',
    'voiceActor',
  ]

  // csv書き込み設定
  const writer = csvWriter.createObjectCsvWriter({
    path: 'c://Users/user/Downloads/test1.csv',
    header: headers,
    encoding: 'utf8',
    append: false,
  })

  // csvBodyにデータを追加

  // csvを書き込み
  writer
    .writeRecords(datas)
    .then(() => {
      console.log('success')
    })
    .catch((error: string | undefined) => {
      console.log(error)
    })
}

export default exportCsv
