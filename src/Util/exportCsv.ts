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

  // csvBodyのデータ
  const csvObject: Array<csvObject> = []
  datas.sort()

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
      console.log('success')
    })
    .catch((error: string | undefined) => {
      console.log(error)
    })
}

export default exportCsv
