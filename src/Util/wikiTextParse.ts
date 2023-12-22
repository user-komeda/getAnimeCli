import { JSDOM } from 'jsdom'
import EpisodeObject from '../types/EpisodeObject'
import voiceActorObject from 'src/types/VoiceActorObject'

/**
 * characterList取得
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseCharacter = (
  text: string,
  content: string
): Array<string> => {
  const characterListData: Array<string> = []
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    }
  }

  let whileElement: Element | null = elementList[searchIndex]
  while (whileElement) {
    whileElement = whileElement.nextElementSibling
    if (!whileElement) {
      break
    }

    const tagName = whileElement.tagName
    if (tagName === 'H2') {
      break
    }

    if (tagName === 'DL') {
      const characterList = whileElement.querySelectorAll('dt')
      for (const character of characterList) {
        characterListData.push(character.textContent ?? '')
      }
    }
  }

  return characterListData
}

/**
 * 声優情報取得
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseVoiceActor = (
  text: string,
  content: string
): Array<voiceActorObject> => {
  const voiceActorList: Array<voiceActorObject> = []
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    }
  }

  let whileElement: Element | null = elementList[searchIndex]
  while (whileElement) {
    whileElement = whileElement.nextElementSibling
    if (!whileElement) {
      break
    }

    const tagName = whileElement.tagName
    if (tagName === 'H2') {
      break
    }

    if (tagName === 'DL') {
      const characterList = whileElement.querySelectorAll('dt')
      for (const character of characterList) {
        const voiceActor = character.nextElementSibling?.textContent ?? ''
        if (voiceActor[0] === '声') {
          const voiceActor: voiceActorObject = {
            characterName: character.textContent ?? '',
            voiceActorName: character.nextElementSibling?.textContent ?? '',
          }
          voiceActorList.push(voiceActor)
        }
      }
    }
  }

  return voiceActorList
}

/**
 * parseStaffInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content context
 * @return {string} text
 */
export const wikiTextParseStaff = (
  text: string,
  content: string
): Array<string> => {
  const staffList: Array<string> = []
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    }
  }

  const ulElement = elementList[searchIndex]?.nextElementSibling
  const liElementList = ulElement?.querySelectorAll('li')
  if (liElementList) {
    for (const liElement of liElementList) {
      staffList.push(liElement.textContent ?? '')
    }
  }

  return staffList
}

/**
 * parseSoundInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseSound = (
  text: string,
  content: string
): Array<string> => {
  const soundListData: Array<string> = []
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    }
  }

  let whileElement: Element | null = elementList[searchIndex]

  while (whileElement) {
    whileElement = whileElement.nextElementSibling
    if (!whileElement) {
      break
    }

    const tagName = whileElement.tagName

    if (tagName === 'H3') {
      break
    }

    if (tagName === 'DL') {
      const soundList = whileElement.querySelectorAll('DT')
      for (const sound of soundList) {
        soundListData.push(sound.textContent ?? '')
      }
    }
  }

  return soundListData
}

/**
 * parseEpisodeInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseEpisode = (
  text: string,
  content: string
): Array<EpisodeObject> => {
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    }
  }
  const tableElement = elementList[searchIndex]?.nextElementSibling
  const episodeList: Array<EpisodeObject> = []
  if (tableElement) {
    const trElementList = tableElement.querySelectorAll('tr')

    for (const trElement of trElementList) {
      const tdElement = trElement.querySelectorAll('td')
      if (!tdElement) {
        continue
      }

      const episodeNumber = tdElement[0]?.textContent
      const episodeTitle = tdElement[1]?.textContent
      if (episodeNumber && episodeTitle) {
        const episodeObject: EpisodeObject = {
          episodeTitle,
          episodeNumber,
        }
        episodeList.push(episodeObject)
      }
    }
  }
  return episodeList
}

/**
 * ページ内テキストから見出しをすべて取得
 *
 * @param {string} text text
 * @return {Element} Element
 */
const selectSection = (text: string): NodeListOf<Element> => {
  const dom = new JSDOM(text)
  const { document } = dom.window
  return document.querySelectorAll('h1,h2,h3,h4,h5,h6')
}
