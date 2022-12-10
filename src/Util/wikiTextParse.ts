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
// export const wikiTextParseCharacter = (
//   text: string,
//   sectionIndex: number
// ): string => {
//   const element = selectSection(text)[sectionIndex]
//   let whileElement: Element | null = element
//   while (whileElement) {
//     whileElement = whileElement.nextElementSibling
//     if (!whileElement) {
//       break
//     }

//     const tagName = whileElement.tagName
//     if (tagName === 'H2') {
//       break
//     }

//     if (tagName === 'DL') {
//       const characterList = whileElement.querySelectorAll('dt')
//       for (const character of characterList) {
//         console.log(character)
//       }
//     }
//   }

//   return ''
// }

/**
 * parseVoiceActorInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
// export const wikiTextParseVoiceActor = (
//   text: string,
//   sectionIndex: number
// ): string => {
//   const element = selectSection(text)[sectionIndex]
//   let whileElement: Element | null = element
//   while (whileElement) {
//     whileElement = whileElement.nextElementSibling
//     if (!whileElement) {
//       break
//     }

//     const tagName = whileElement.tagName
//     if (tagName === 'H2') {
//       break
//     }

//     if (tagName === 'DL') {
//       const characterList = whileElement.querySelectorAll('dt')
//       for (const character of characterList) {
//         const voiceActorList = character.nextElementSibling?.children
//         if (voiceActorList) {
//           // eslint-disable-next-line max-depth
//           for (const voiceActor of voiceActorList) {
//             // eslint-disable-next-line max-depth
//             if (voiceActor.tagName === 'A') {
//             }
//           }
//         }
//       }
//     }
//   }

//   return ''
// }

/**
 * parseStaffInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
// export const wikiTextParseStaff = (
//   text: string,
//   sectionIndex: number
// ): string => {
//   const element = selectSection(text)[sectionIndex]
//   const staffTableElement = element.nextElementSibling
//   if (staffTableElement) {
//     const tmpStaffList = [...staffTableElement.querySelectorAll('tr td')]
//     const staffList = tmpStaffList.filter(tmpStaff => {
//       return tmpStaff.textContent !== '-' && tmpStaff.textContent !== '-\\n'
//     })
//     for (const staff of staffList) {
//     }
//   }

//   return ''
// }

/**
 * parseSoundInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
// export const wikiTextParseSound = (
//   text: string,
//   sectionIndex: number
// ): string => {
//   const element = selectSection(text)[sectionIndex]
//   let whileElement: Element | null = element
//   while (whileElement) {
//     whileElement = whileElement.nextElementSibling
//     if (!whileElement) {
//       break
//     }

//     const tagName = whileElement.tagName

//     if (tagName === 'H3') {
//       break
//     }

//     if (tagName === 'DL') {
//       const soundList = whileElement.querySelectorAll('DT')
//       for (const sound of soundList) {
//       }
//     }
//   }

//   return ''
// }

/**
 * parseEpisodeInfoFromGetResponseData
 *
 * @param {string} text text
 * @param {string} content content
 * @return {string} text
 */
export const wikiTextParseEpisode = (text: string, content: string): string => {
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
  return ''
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
