import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import Logging from 'library/logging'
import * as bcrypt from 'bcrypt'

export const hash = async (data: string, salt = 10): Promise<string> => {
  try {
    const generatedSalt = await bcrypt.genSalt(salt)
    return bcrypt.hash(data, generatedSalt)
  } catch (error) {
    Logging.error(error)
    throw new BadRequestException('Something went wrong while hashing password.')
  }
}

export const compareHash = async (data: string | Buffer, encryptedData: string): Promise<boolean> => {
  try {
    return bcrypt.compare(data, encryptedData)
  } catch (error) {
    Logging.error(error)
    throw new InternalServerErrorException('Something went wrong while comparing hash.')
  }
}
