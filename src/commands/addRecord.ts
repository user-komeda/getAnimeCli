import { Command, Flags } from '@oclif/core'
import { PrismaClient } from '@prisma/client'
import AnimeTable from '@type/AnimeTable'
import SoundTable from '@type/SoundTable'
import StaffTable from '@type/StaffTable'
import characterTable from '@type/CharacterTable'
import voiceActorTable from '@type/voiceActorTable'
import episodeTable from '@type/EpisodeTable'
import getAnimeJson from '@utils/getAnimeJson'
import AnimeData from '@type/AnimeData'
import CharacterTable from '@type/CharacterTable'
import EpisodeTable from '@type/EpisodeTable'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * データベースにレコードを登録する
 */
export default class AddRecord extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    name: Flags.string({ char: 'n', description: 'name to print' }),
  }

  /**
   * メイン処理
   */
  public async run(): Promise<void> {
    if (fs.existsSync(path.join(process.cwd(), 'dist', 'anime.json'))) {
      fs.unlinkSync(path.join(process.cwd(), 'dist', 'anime.json'))
    }
    const cat = spawn(
      "dir ./dist -include ('*.json' ) -recurse | cat | jq -s . > dist/anime.json",
      {
        shell: 'pwsh.exe',
        stdio: 'inherit',
      }
    )
    cat.on('exit', async () => {
      const animeDataList = getAnimeJson('anime.json')
      console.log(animeDataList)
      console.time('aaa')

      try {
        await this.addRecordAnime(this.createAnimeTableData(animeDataList))
        await this.addRecordSound(this.createSoundTableData(animeDataList))
        await this.addRecordCharacter(
          this.createCharacterTableData(animeDataList)
        )
        await this.addRecordStaff(this.createStaffTableData(animeDataList))
        await this.addRecordEpisode(this.createEpisodeTableData(animeDataList))
        await this.addRecordVoiceActor(
          this.createVoiceActorTableData(animeDataList)
        )
      } catch (error) {
        console.error(error)
      }

      console.timeEnd('aaa')
    })
  }

  /**
   * レコード登録関数
   * @param {Array<AnimeTable>} dates  登録データ
   */
  private async addRecordAnime(dates: Array<AnimeTable>) {
    const prisma = new PrismaClient()

    for (const data of dates) {
      await prisma.anime.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_name: data.anime_name,
          anime_en_name: data.anime_en_name,
          anime_year: data.anime_year,
          anime_cool: data.anime_cool,
        },
        create: {
          id: data.id,
          anime_name: data.anime_name,
          anime_en_name: data.anime_en_name,
          anime_year: data.anime_year,
          anime_cool: data.anime_cool,
        },
      })
    }
  }

  /**
   * animeテーブル登録関数
   * @param {Array<SoundTable>} datas datas
   */
  private async addRecordSound(datas: Array<SoundTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      await prisma.sound.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_Id: data.anime_Id,
          op: data.op,
          ed: data.ed,
        },
        create: {
          id: data.id,
          anime_Id: data.anime_Id,
          op: data.op,
          ed: data.ed,
        },
      })
    }
  }

  /**
   * staffテーブル登録関数
   * @param {Array<StaffTable>} datas datas
   */
  private async addRecordStaff(datas: Array<StaffTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      await prisma.staff.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_Id: data.anime_Id,
          staff: data.staff,
        },
        create: {
          id: data.id,
          anime_Id: data.anime_Id,
          staff: data.staff,
        },
      })
    }
  }

  /**
   * キャラクタテーブル登録関数
   * @param {Array<characterTable>} datas datas
   */
  private async addRecordCharacter(datas: Array<characterTable>) {
    const prisma = new PrismaClient()
    for (const data of datas) {
      await prisma.character.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_Id: data.anime_Id,
          character: data.character,
        },
        create: {
          id: data.id,
          anime_Id: data.anime_Id,
          character: data.character,
        },
      })
    }
  }

  /**
   * 声優テーブル登録関数
   * @param {Array<voiceActorTable>} datas datas
   */
  private async addRecordVoiceActor(datas: Array<voiceActorTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      await prisma.voice_actor.upsert({
        where: {
          id: data.id,
        },
        update: {
          character_Id: data.character_Id,
          voice_actor: data.voice_actor,
          animeId: data.animeId,
        },
        create: {
          id: data.id,
          character_Id: data.character_Id,
          voice_actor: data.voice_actor,
          animeId: data.animeId,
        },
      })
    }
  }

  /**
   * episodeテーブル登録関数
   * @param {Array<SoundTable>} datas datas
   */
  private async addRecordEpisode(datas: Array<episodeTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      await prisma.episode.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_Id: data.anime_Id,
          episode: data.episode,
          episode_title: data.episode_title,
        },
        create: {
          id: data.id,
          anime_Id: data.anime_Id,
          episode: data.episode,
          episode_title: data.episode_title,
        },
      })
    }
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<AnimeData>} テーブルに登録するデータ
   */
  private createAnimeTableData(
    animeDataList: Array<AnimeData>
  ): Array<AnimeTable> {
    const regExp = /年|月|日/gi
    const animeTableList = animeDataList.map((data, index) => {
      const animeYear = new Date(
        data.televisedBroadcastDate.replace(regExp, '/')
      )
      const month = animeYear.getMonth() + 1 || 0
      const animeCool = Math.ceil(month / 3)
      const animeTable: AnimeTable = {
        id: index,
        anime_name: data.title,
        anime_en_name: data.title,
        anime_cool: animeCool,
        anime_year: animeYear,
      }
      return animeTable
    })
    return animeTableList
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<CharacterTable>} テーブルに登録するデータ
   */
  private createCharacterTableData(
    animeDataList: Array<AnimeData>
  ): Array<characterTable> {
    const characterTableList = animeDataList.map((dataList, i) => {
      const characterTableList = dataList.characterList.map((character, v) => {
        const characterTable: CharacterTable = {
          id: v + i,
          anime_Id: i,
          character: character,
        }
        return characterTable
      })
      return characterTableList
    })
    return characterTableList.flat()
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<SoundTable>} テーブルに登録するデータ
   */
  private createSoundTableData(
    animeDataList: Array<AnimeData>
  ): Array<SoundTable> {
    const soundTableList = animeDataList.map((dataList, i) => {
      const soundTableList = dataList.soundList.map((data, v) => {
        const soundTable: SoundTable = {
          id: v + i,
          anime_Id: i,
          op: data,
          ed: data,
        }
        return soundTable
      })
      return soundTableList
    })
    return soundTableList.flat()
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<EpisodeTable>} テーブルに登録するデータ
   */
  private createEpisodeTableData(
    animeDataList: Array<AnimeData>
  ): Array<EpisodeTable> {
    const regExp = /\s|\n/gi
    const episodeTableList = animeDataList.map((dataList, i) => {
      const episodeTableList = dataList.episodeList.map((data, v) => {
        const episodeTable: EpisodeTable = {
          id: v + i,
          anime_Id: i,
          episode: data.episodeNumber,
          episode_title: data.episodeTitle.replace(regExp, ''),
        }
        return episodeTable
      })
      return episodeTableList
    })
    return episodeTableList.flat()
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<StaffTable>} テーブルに登録するデータ
   */
  private createStaffTableData(
    animeDataList: Array<AnimeData>
  ): Array<StaffTable> {
    const staffTableList = animeDataList.map((dataList, i) => {
      const staffTableList = dataList.staffList.map((data, v) => {
        const staffTable: StaffTable = {
          id: v + i,
          anime_Id: i,
          staff: data,
        }
        return staffTable
      })
      return staffTableList
    })
    return staffTableList.flat()
  }

  /**
   *取得したアニメ情報をもとにテーブルに登録する情報を作成
   * @param {Array<AnimeData>} animeDataList アニメ情報
   * @return {Array<voiceActorTable>} テーブルに登録するデータ
   */
  private createVoiceActorTableData(
    animeDataList: Array<AnimeData>
  ): Array<voiceActorTable> {
    const voiceActorTableList = animeDataList.map((dataList, i) => {
      const voiceActorTableList = dataList.voiceActorList.map((data, v) => {
        const voiceActorTable: voiceActorTable = {
          id: v + i,
          animeId: i,
          character_Id: data.characterId + i,
          voice_actor: data.voiceActorName,
        }
        return voiceActorTable
      })
      return voiceActorTableList
    })
    return voiceActorTableList.flat()
  }
}
