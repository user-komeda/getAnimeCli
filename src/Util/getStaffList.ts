import { wikiTextParseStaff } from './wikiTextParse'
const getStaffList = (text: string, content: string): string => {
  return wikiTextParseStaff(text, content)
}

export default getStaffList
