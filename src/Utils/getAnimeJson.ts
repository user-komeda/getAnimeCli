import AnimeData from '@type/AnimeData'
import path from 'path'
import fs from 'fs'

/**
 *jsonファイルからアニメリストを取得
 * @param {string} fileName  fileName
 * @param {string} directoryName directoryName
 * @return {Array<AnimeData>} アニメリスト
 */
const getAnimeJson = (
  fileName: string,
  directoryName?: string
): Array<AnimeData> => {
  const jsonData = fs.readFileSync(
    path.join(process.cwd(), 'dist', directoryName ?? '', fileName)
  )
  const tmpParsedJsonData: Array<AnimeData> = JSON.parse(
    jsonData.toString()
  ) as AnimeData[]
  const a = tmpParsedJsonData.map((data) => {
    return JSON.parse(JSON.stringify(data)) as AnimeData[]
  })
  return a.flat()
}
export default getAnimeJson
