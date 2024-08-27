export const checkValidPhoneNumber = (checkValidPhoneNumber) => {
    const phonePattern = /^0\d{9,10}$/
    return phonePattern.test(phoneNumber)
  }