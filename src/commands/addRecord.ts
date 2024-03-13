/* eslint-disable no-await-in-loop */
import { Command, Flags } from '@oclif/core'
import { PrismaClient } from '@prisma/client'
import AnimeTable from '@type/AnimeTable'
import SoundTable from '@type/SoundTable'
import StaffTable from '@type/StaffTable'
import characterTable from '@type/CharacterTable'
import voiceActorTable from '@type/voiceActorTable'
import episodeTable from '@type/EpisodeTable'

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
    //  動作確認用にコメントアウト

    // const { args, flags } = await this.parse(Add)

    // const responses: any = await inquirer.prompt([
    //   {
    //     name: 'content',
    //     message: 'select insert table',
    //     type: 'list',
    //     choices: [
    //       { name: 'anime' },
    //       { name: 'sound' },
    //       { name: 'character' },
    //       { name: 'staff' },
    //       { name: 'episode' },
    //       { name: 'voice_actor' },
    //     ],
    //   },
    // ])

    const data: Array<AnimeTable> = [
      {
        id: 1,
        anime_name: 'Viola the Magnificent',
        anime_en_name: 'test56',
        anime_year: new Date(),
        anime_cool: 1,
      },
      {
        id: 2,
        anime_name: 'Viola the Magnificent',
        anime_en_name: 'test2',
        anime_year: new Date(),
        anime_cool: 1,
      },
      {
        id: 3,
        anime_name: 'Viola the Magnificent',
        anime_en_name: 'test3',
        anime_year: new Date(),
        anime_cool: 1,
      },
      {
        id: 4,
        anime_name: 'Viola the Magnificent',
        anime_en_name: 'test4',
        anime_year: new Date(),
        anime_cool: 1,
      },
    ]

    this.addRecordAnime(data)
  }

  /**
   * レコード登録関数
   *
   * @param {Array<AnimeTable>} dates  登録データ
   */
  private async addRecordAnime(dates: Array<AnimeTable>) {
    const prisma = new PrismaClient()

    for (const data of dates) {
      const anime = await prisma.anime.upsert({
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
      console.log(anime)
    }
  }

  /**
   * animeテーブル登録関数
   *
   * @param {Array<SoundTable>} datas datas
   */
  private async addRecordSound(datas: Array<SoundTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.sound.upsert({
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
      console.log(anime)
    }
  }

  /**
   * staffテーブル登録関数
   *
   * @param {Array<StaffTable>} datas datas
   */
  private async addRecordStaff(datas: Array<StaffTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.staff.upsert({
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
      console.log(anime)
    }
  }

  /**
   * キャラクタテーブル登録関数
   *
   * @param {Array<characterTable>} datas datas
   */
  private async addRecordCharacter(datas: Array<characterTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.character.upsert({
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
      console.log(anime)
    }
  }

  /**
   * 声優テーブル登録関数
   *
   * @param {Array<voiceActorTable>} datas datas
   */
  private async addRecordVoiceActor(datas: Array<voiceActorTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.voice_actor.upsert({
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
      console.log(anime)
    }
  }

  /**
   * episodeテーブル登録関数
   *
   * @param {Array<SoundTable>} datas datas
   */
  private async addRecordEpisode(datas: Array<episodeTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.episode.upsert({
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
      console.log(anime)
    }
  }

  /**
   * 登録したいコンテンツ選択
   *
   * @param {string} content content
   * @param {Array<SoundTable>} datas datas
   */
  private whichSelectContent(content: string, datas: Array<AnimeTable>) {
    switch (content) {
      case 'anime':
        this.addRecordAnime(datas)
        break
      case 'sound':
        break
      case 'character':
        break
      case 'staff':
        break
      case 'voice_actor':
        break
      case 'episode':
        break
      default:
        break
    }
  }
}
