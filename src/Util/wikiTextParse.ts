import console = require('console')
import { JSDOM } from 'jsdom'
import EpisodeObject from '../types/EpisodeObject'

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
): string => {
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    } else {
      console.log(element.textContent)
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
        console.log(character.textContent)
      }
    }
  }

  return ''
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
): string => {
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    } else {
      console.log(element.textContent)
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
          console.log(character.textContent)
          console.log(character.nextElementSibling?.textContent)
        }
      }
    }
  }

  return ''
}

/**
 * parseStaffInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content context
 * @return {string} text
 */
export const wikiTextParseStaff = (text: string, content: string): string => {
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    } else {
      console.log(element.textContent)
    }
  }

  console.log(searchIndex)
  const ulElement = elementList[searchIndex].nextElementSibling
  const liElementList = ulElement?.querySelectorAll('li')
  if (liElementList) {
    for (const liElement of liElementList) {
      console.log(liElement.textContent)
    }
  }

  return ''
}

/**
 * parseSoundInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseSound = (text: string, content: string): string => {
  const elementList = selectSection(
    text.replace(/<style(\s|>).*?<\/style>/gi, '')
  )
  let searchIndex = 0
  for (const [index, element] of elementList.entries()) {
    if (element.textContent === content) {
      searchIndex = index
    } else {
      console.log(element.textContent)
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
        console.log(sound.textContent)
      }
    }
  }

  return ''
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
    } else {
      console.log(element.textContent)
    }
  }

  console.log(searchIndex)
  const tableElement = elementList[searchIndex].nextElementSibling
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

  console.log(episodeList)
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
  return document.querySelectorAll('h2,h3,h4,h5,h6')
}
