import { JSDOM } from 'jsdom'

/**
 * parseCharacterInfoFromGetResponseData
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
 * parseCharacterInfoFromGetResponseData
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
 * parseCharacterInfoFromGetResponseData
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseStaff = (text: string): string => {
  console.log(text)
  return ''
}

/**
 * parseCharacterInfoFromGetResponseData
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseSound = (): string => {
  return ''
}

/**
 * parseCharacterInfoFromGetResponseData
 * @param {string} text text
 * @param {number} sectionIndex sectionIndex
 * @return {string} text
 */
export const wikiTextParseEpisode = (): string => {
  return ''
}

/**
 * page内のテキストから取得したい情報の目次番号を返す
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
 * @param {string} text text
 * @return {Element} Element
 */
const selectSection = (text: string): NodeListOf<Element> => {
  const dom = new JSDOM(text)
  const document = dom.window.document
  return document.querySelectorAll('h2,h3,h4,h5,h6')
}
