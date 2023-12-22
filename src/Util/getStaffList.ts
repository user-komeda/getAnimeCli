import { wikiTextParseStaff } from './wikiTextParse'
const getStaffList = (text: string, content: string): Array<string> => {
  return wikiTextParseStaff(text, content)
}

export default getStaffList
