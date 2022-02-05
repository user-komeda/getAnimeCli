/* eslint-disable no-await-in-loop */
import { Command, Flags } from '@oclif/core'
import { PrismaClient, Prisma } from '@prisma/client'
import AnimeTable from 'src/types/AnimeTable'
/**
 *
 */
export default class Add extends Command {
  static description = 'describe the command here'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: 'f' }),
  }

  static args = [{ name: 'file' }]

  /**
   *
   */
  public async run (): Promise<void> {
    const { args, flags } = await this.parse(Add)

    // const name = flags.name ?? 'world'

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }

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
}
