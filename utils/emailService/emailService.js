import { mailClientConfig, mailSender } from "./email.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js"

export const sendVerificationEmail = async (email, verificationToken)=>{
    const recipient = [{email}]
    try {
        const response = await mailClientConfig.send({
            from: mailSender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category : "Email Verification"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send verification email")
    }
}

export const sendWellcomeEmail = async (email)=>{
    const recipient = [{email}]
    try {
        const response = await mailClientConfig.send({
            from: mailSender,
            to: recipient,
            subject: "Wellcome Email",
            html: VERIFICATION_EMAIL_TEMPLATE,
            category : "Wellcome Email"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send verification email")
    }
}

export const sendEmailResetPassword = async (email , url)=>{
    const recipient = [{email}]
    try {
        const response = await mailClientConfig.send({
            from: mailSender,
            to: recipient,
            subject: "Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url),
            category : "Reset Password"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send reset password email")
    }
}

export const sendEmailSuccessResetPassword = async (email)=>{
    const recipient = [{email}]
    try {
        const response = await mailClientConfig.send({
            from: mailSender,
            to: recipient,
            subject: "Password Reset Success",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password Reset Success"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send success reset password email")
    }
}