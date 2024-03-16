import AnimeData from '@type/AnimeData'
import path = require('path')
import * as fs from 'fs'

/**
 *jsonファイルからアニメリストを取得
 *
 * @param {string} fileName  fileName
 * @return {Array<AnimeData>} アニメリスト
 */
const getAnimeJson = (fileName: string): Array<AnimeData> => {
  const jsonData = fs.readFileSync(path.join(process.cwd(), 'dist', fileName))
  const tmpParsedJsonData: Array<AnimeData> = JSON.parse(
    jsonData.toString()
  ) as AnimeData[]
  return tmpParsedJsonData
}
export default getAnimeJson
