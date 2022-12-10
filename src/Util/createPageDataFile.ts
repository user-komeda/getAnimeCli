import * as fs from 'node:fs'
const createPageDataFile = (text: string) => {
  fs.writeFileSync(
    'C://Users/user/Desktop/learning/oclif/animecli/out/PageData.txt',
    text
  )
}

export default createPageDataFile
