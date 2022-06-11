import console = require('console')
import { JSDOM } from 'jsdom'
import EpisodeObject from '../types/EpisodeObject'

/**
 * parseCharacterInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseCharacter = (
  text: string,
  sectionIndex: number
): string => {
  const element = selectSection(text)[sectionIndex]
  let whileElement: Element | null = element
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
 * parseVoiceActorInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseVoiceActor = (
  text: string,
  sectionIndex: number
): string => {
  const element = selectSection(text)[sectionIndex]
  let whileElement: Element | null = element
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
        const voiceActorList = character.nextElementSibling?.children
        if (voiceActorList) {
          // eslint-disable-next-line max-depth
          for (const voiceActor of voiceActorList) {
            // eslint-disable-next-line max-depth
            if (voiceActor.tagName === 'A') {
              console.log(voiceActor.textContent)
            }
          }
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
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseStaff = (
  text: string,
  sectionIndex: number
): string => {
  const element = selectSection(text)[sectionIndex]
  const staffTableElement = element.nextElementSibling
  if (staffTableElement) {
    const tmpStaffList = [...staffTableElement.querySelectorAll('tr td')]
    const staffList = tmpStaffList.filter((tmpStaff) => {
      return tmpStaff.textContent !== '-' && tmpStaff.textContent !== '-\\n'
    })
    for (const staff of staffList) {
      console.log(staff.textContent)
    }
  }

  return ''
}

/**
 * parseSoundInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseSound = (
  text: string,
  sectionIndex: number
): string => {
  const element = selectSection(text)[sectionIndex]
  let whileElement: Element | null = element
  while (whileElement) {
    whileElement = whileElement.nextElementSibling
    if (!whileElement) {
      break
    }

    const tagName = whileElement.tagName

    if (tagName === 'H3') {
      break
    }

    console.log(whileElement.tagName)
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
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseEpisode = (
  text: string,
  sectionIndex: number
): string => {
  const element = selectSection(text)[sectionIndex]
  const tableElement = element.nextElementSibling
  const episodeList: Array<EpisodeObject> = []
  if (tableElement) {
    const trElementList = tableElement.querySelectorAll('tr')
    console.log(trElementList)

    for (const trElement of trElementList) {
      const tdElement = trElement.querySelectorAll('td')
      if (!tdElement) {
        continue
      }

      const episodeNumber = tdElement[0]?.textContent
      const episodeTitle = tdElement[1]?.textContent
      if (episodeNumber && episodeTitle) {
        const episodeObject: EpisodeObject = {
          episodeTitle: episodeTitle,
          episodeNumber: episodeNumber,
        }
        episodeList.push(episodeObject)
      }
    }
  }

  console.log(episodeList)
  return ''
}

/**
 * page内のテキストから取得したい情報の目次番号を返す
 *
 * @param {string} pageText pageText
 * @param {string} filterTopic filterTopic
 * @return {string} topicNumber
 */
export const getTopicNumber = (
  pageText: string,
  filterTopic: string
): number => {
  const dom = new JSDOM(pageText)
  const document = dom.window.document
  const elementList = document.querySelectorAll('h2')
  let topicNumber = 0
  for (const element of elementList) {
    if (element.textContent === '目次') {
      const topic = element.parentElement?.nextElementSibling
      const topicList = topic?.querySelectorAll('li')
      if (topicList) {
        for (const [index, topic] of topicList.entries()) {
          const text = topic.querySelectorAll('span')[1]
          // eslint-disable-next-line max-depth
          if (text.textContent === filterTopic) {
            topicNumber = index + 1
            break
          }
        }
      }

      break
    }
  }

  return topicNumber
}

/**
 * ページ内テキストから見出しをすべて取得
 *
 * @param {string} text text
 * @return {Element} Element
 */
const selectSection = (text: string): NodeListOf<Element> => {
  const dom = new JSDOM(text)
  const document = dom.window.document
  return document.querySelectorAll('h2,h3,h4,h5,h6')
}
