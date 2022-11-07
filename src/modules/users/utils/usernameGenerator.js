
class UsernameGenerator {
  static removeSpecialChars (name) {
    const cleanName = name.normalize('NFD').replace(/\p{Diacritic}/gu, '')

    return cleanName
  }

  static createUsernameFromName (name) {
    try {
      if (!name) throw new Error('Invalid name')

      const nameToArray = name.split(' ')

      console.log(nameToArray)

      const firstName = this.removeSpecialChars(nameToArray[0])
      const lastName = this.removeSpecialChars(nameToArray[nameToArray.length - 1])
      const identifier = Math.floor(Math.random() * (999 - 100 + 1) + 100)

      console.log(firstName, lastName)

      const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${identifier}`

      return username
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = UsernameGenerator
