import { JSDOM } from 'jsdom'
import EpisodeObject from '@type/EpisodeObject'
import voiceActorObject from '@type/VoiceActorObject'

/**
 * characterList取得
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
    if (element.id === content) {
      searchIndex = index
    }
  }

  try {
    let whileElement: Element | null =
      elementList[searchIndex].parentElement?.nextElementSibling ?? null
    while (whileElement) {
      whileElement = whileElement.nextElementSibling ?? null
      if (!whileElement) {
        break
      }

      if (whileElement.className.includes('mw-heading2')) {
        break
      }

      if (whileElement.tagName === 'DL') {
        const characterList = whileElement.querySelectorAll('dt')
        for (const character of characterList) {
          characterListData.push(character.textContent ?? '')
        }
      }
    }
    return characterListData
  } catch (e) {
    console.error(e)
    return []
  }
}

/**
 * 声優情報取得
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
    if (element.id === content) {
      searchIndex = index
    }
  }

  try {
    let whileElement: Element | null =
      elementList[searchIndex].parentElement?.nextElementSibling ?? null
    while (whileElement) {
      whileElement = whileElement.nextElementSibling
      if (!whileElement) {
        break
      }

      if (whileElement.className.includes('mw-heading2')) {
        break
      }

      if (whileElement.tagName === 'DL') {
        const characterList = whileElement.querySelectorAll('dt')
        for (const [index, character] of characterList.entries()) {
          const voiceActor = character.nextElementSibling?.textContent ?? ''
          if (voiceActor[0] === '声') {
            const voiceActor: voiceActorObject = {
              characterId: index,
              characterName: character.textContent ?? '',
              voiceActorName: character.nextElementSibling?.textContent ?? '',
            }
            voiceActorList.push(voiceActor)
          }
        }
      }
    }

    return voiceActorList
  } catch (e) {
    console.error(e)
    return []
  }
}

/**
 * parseStaffInfoFromGetResponseData
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
    if (element.id === content) {
      searchIndex = index
    }
  }

  const ulElement = elementList[searchIndex]?.parentElement?.nextElementSibling
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
    if (element.id === content) {
      searchIndex = index
    }
  }

  let whileElement: Element | null = elementList[searchIndex]

  while (whileElement) {
    whileElement = whileElement.parentElement?.nextElementSibling ?? null
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
    if (element.id === content) {
      searchIndex = index
    }
  }
  const _tableElement =
    elementList[searchIndex]?.parentElement?.nextElementSibling
  const tableElement = searchTableElement(_tableElement ?? null)
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
const searchTableElement = (element: Element | null): Element | null => {
  if (element === null) {
    return element
  }
  if (element.tagName === 'TABLE' || element.className.includes('wikitable')) {
    return element
  } else {
    return searchTableElement(element.nextElementSibling)
  }
}
/**
 * parseTelevisedBroadcastDate
 * @param {string} text text
 * @param {Array<string>} content content
 * @return {string} text
 */
export const wikiTextParseTelevisedBroadcastDate = (
  text: string,
  content: Array<string>
): string => {
  const replacedText = text.replace(/<style(\s|>).*?<\/style>/gi, '')
  const document = convertTextToDom(replacedText)
  try {
    const firstTableElement =
      document.querySelector('table.infobox') ??
      (() => {
        throw new Error()
      })()

    const thElementList = firstTableElement.querySelectorAll('th')
    const findElement = Array.from(thElementList).find((thElement) => {
      return content.includes(
        thElement.textContent?.replace(/\r?\n/g, '') ?? ''
      )
    })
    const matchedElement = findElement?.nextElementSibling?.textContent?.match(
      /[0-9]{4}年([1-9]|0[1-9]|1[0-2])月([1-9]|0[1-9]|[12][0-9]|3[01])日/g
    )
    return matchedElement ? matchedElement[0] : ''
  } catch (error) {
    console.error(error)
    return ''
  }
}

/**
 * ページ内テキストから見出しをすべて取得
 * @param {string} text text
 * @return {Element} Element
 */
const selectSection = (text: string): NodeListOf<Element> => {
  const document = convertTextToDom(text)
  return document.querySelectorAll('h1,h2,h3,h4,h5,h6')
}

const convertTextToDom = (text: string): Document => {
  const dom = new JSDOM(text)
  const { document } = dom.window
  return document
}
