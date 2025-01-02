import { Command } from '@oclif/core'
import * as csvWriter from 'csv-writer'
import csvObject from '@type/csvObject'
import path from 'path'
import AnimeData from '@type/AnimeData'
import getAnimeJson from '@utils/getAnimeJson'
import * as fs from 'fs'

/**
 * 入力された引数を使用しcsvを出力
 */
export default class ExportCsv extends Command {
  private TV_ANIME_JSON_FILE_NAME = 'tvAnime.json'
  private WEB_ANIME_JSON_FILE_NAME = 'webAnime.json'
  private OVA_ANIME_JSON_FILE_NAME = 'ovaAnime.json'
  private MOVIE_ANIME_JSON_FILE_NAME = 'movieAnime.json'
  private TV_ANIME_CSV_FILE_NAME = 'tvAnime.csv'
  private WEB_ANIME_CSV_FILE_NAME = 'webAnime.csv'
  private OVA_ANIME_CSV_FILE_NAME = 'ovaAnime.csv'
  private MOVIE_ANIME_CSV_FILE_NAME = 'movieAnime.csv'

  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  // static args = [{ name: 'data' }]

  // static flags = {
  //   content: Flags.string({ options: ['title', 'en-title'] }),
  // }

  /**
   * メイン処理
   */
  async run(): Promise<void> {
    // const { args } = await this.parse(ExportCsv)
    // // データをカンマ区切りにする
    // const dates: string[] = args.data.split(',')
    const directoryList = fs
      .readdirSync(path.join(process.cwd(), 'dist'))
      .filter((v) => {
        return fs.statSync(path.join(process.cwd(), 'dist', v)).isDirectory()
      })
    directoryList.forEach((v) => {
      this.createCsvObject(
        getAnimeJson(this.TV_ANIME_JSON_FILE_NAME, v),
        this.TV_ANIME_CSV_FILE_NAME,
        v
      )
      this.createCsvObject(
        getAnimeJson(this.WEB_ANIME_JSON_FILE_NAME, v),
        this.WEB_ANIME_CSV_FILE_NAME,
        v
      )
      this.createCsvObject(
        getAnimeJson(this.OVA_ANIME_JSON_FILE_NAME, v),
        this.OVA_ANIME_CSV_FILE_NAME,
        v
      )
      this.createCsvObject(
        getAnimeJson(this.MOVIE_ANIME_JSON_FILE_NAME, v),
        this.MOVIE_ANIME_CSV_FILE_NAME,
        v
      )
    })
  }

  /**
   *csv作成
   * @param {Array<AnimeData>} parsedJsonData parsedJsonData
   * @param {string} fileName fileName
   * @param {string} directoryName directoryName
   */
  private createCsvObject(
    parsedJsonData: Array<AnimeData>,
    fileName: string,
    directoryName: string
  ) {
    const csvObjectList: Array<csvObject> = []
    for (const data of parsedJsonData) {
      const episodeListTitle = []
      const episodeListNumber = []
      const voiceActorListCharacter = []
      const voiceActorListVoiceActor = []
      const csvObject: csvObject = {
        pageId: '',
        title: '',
        characterList: [],
        episodeListTitle: [],
        episodesListNumber: [],
        soundList: [],
        staffList: [],
        voiceActorListCharacter: [],
        voiceActorListVoiceActor: [],
      }

      for (const episode of data.episodeList) {
        episodeListTitle.push(episode.episodeTitle)
        episodeListNumber.push(episode.episodeNumber)
      }

      for (const voiceActor of data.voiceActorList) {
        voiceActorListCharacter.push(voiceActor.characterName)
        voiceActorListVoiceActor.push(voiceActor.voiceActorName)
      }

      csvObject.pageId = data.pageId
      csvObject.title = data.title
      csvObject.characterList = data.characterList
      csvObject.episodeListTitle = episodeListTitle
      csvObject.episodesListNumber = episodeListNumber
      csvObject.soundList = data.soundList
      csvObject.staffList = data.staffList
      csvObject.voiceActorListCharacter = voiceActorListCharacter
      csvObject.voiceActorListVoiceActor = voiceActorListVoiceActor
      csvObjectList.push(csvObject)
    }
    this.writeCsv(csvObjectList, fileName, directoryName)
  }

  /**
   *csv書き込み
   * @param {Array<csvObject>} csvObjectList csvObjectList
   * @param {string} fileName fileName
   * @param {string} directoryName directoryName
   */
  private writeCsv(
    csvObjectList: Array<csvObject>,
    fileName: string,
    directoryName: string
  ) {
    if (csvObjectList.length == 0) {
      return
    }
    // // csv書き込み設定
    const writer = csvWriter.createObjectCsvWriter({
      path: path.join(process.cwd(), 'dist', directoryName, fileName),
      header: Object.keys(csvObjectList[0]).map((v) => ({
        id: v,
        title: v,
      })),
      encoding: 'utf8',
      append: false,
    })

    // // csvを書き込み
    writer
      .writeRecords(csvObjectList)
      .then(() => {
        this.log('success')
      })
      .catch((error: string | undefined) => {
        this.log(error)
      })
  }
}
