/* eslint-disable no-await-in-loop */
import { Command, Flags } from '@oclif/core'
import { PrismaClient, Prisma } from '@prisma/client'
import AnimeTable from 'src/types/AnimeTable'
import SoundTable from 'src/types/SountTable'
import StaffTable from 'src/types/StaffTable'
import caracterTable from 'src/types/caracterTable'
import voiceActorTable from 'src/types/voiceActorTable'
import episodeTable from 'src/types/EpisodeTable'
import * as inquirer from 'inquirer'

/**
 *
 */
export default class Add extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
  }

  static args = [{ name: 'data' }]

  /**
   *
   */
  public async run (): Promise<void> {
    const { args, flags } = await this.parse(Add)

    const responses: any = await inquirer.prompt([
      {
        name: 'content',
        message: 'select insert table',
        type: 'list',
        choices: [
          { name: 'anime' },
          { name: 'sound' },
          { name: 'caracter' },
          { name: 'staff' },
          { name: 'episode' },
          { name: 'voice_actor' },
        ],
      },
    ])

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
   *
   */
  private async addRecordAnime (datas: Array<AnimeTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
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
   *
   * @param datas
   */
  private async addRecordSound (datas: Array<SoundTable>) {
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
   *
   * @param datas
   */
  private async addRecordStaff (datas: Array<StaffTable>) {
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
   *
   */
  private async addRecordCaracter (datas: Array<caracterTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.caracter.upsert({
        where: {
          id: data.id,
        },
        update: {
          anime_Id: data.anime_Id,
          caracter: data.caracter,
        },
        create: {
          id: data.id,
          anime_Id: data.anime_Id,
          caracter: data.caracter,
        },
      })
      console.log(anime)
    }
  }

  /**
   *
   */
  private async addRecordVoiceActor (datas: Array<voiceActorTable>) {
    const prisma = new PrismaClient()

    for (const data of datas) {
      const anime = await prisma.voice_actor.upsert({
        where: {
          id: data.id,
        },
        update: {
          caracter_Id: data.caracter_Id,
          voice_actor: data.voice_actor,
          animeId: data.animeId,
        },
        create: {
          id: data.id,
          caracter_Id: data.caracter_Id,
          voice_actor: data.voice_actor,
          animeId: data.animeId,
        },
      })
      console.log(anime)
    }
  }

  /**
   *
   * @param datas
   */
  private async addRecordEpisode (datas: Array<episodeTable>) {
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
   *
   * @param content
   */
  private whichSelectContent (content: string, datas: Array<AnimeTable>) {
    switch (content) {
      case 'anime':
        this.addRecordAnime(datas)
        break
      case 'sound':
        break
      case 'caracter':
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
