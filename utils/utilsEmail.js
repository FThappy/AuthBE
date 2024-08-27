export const checkValidGmail = (gmail) => {
    const gmailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/
    return gmailRegex.test(gmail)
  }