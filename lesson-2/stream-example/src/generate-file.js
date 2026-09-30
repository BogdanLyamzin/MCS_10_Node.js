import fs from 'node:fs'
import { once } from 'node:events'

const generateFile = async ({filePath, fileLines})=> {
  const stream = fs.createWriteStream(
    filePath,
  )

  for (let i = 1; i <= fileLines; i++) {
    const line =
      `${i} 200 GET /users/${i} ` +
      `2026-09-30T12:00:00.000Z\n`

    const canContinue = stream.write(line)

    if (!canContinue) {
      await once(stream, 'drain')
    }
  }

  stream.end()

  await once(stream, 'finish')

  console.log('Файл створений')
}

export default generateFile;