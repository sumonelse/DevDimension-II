/**
 * Pure contact-form validators.
 *
 * These deliberately return their result instead of writing state. The previous
 * implementation had each validator call `setErrors` and return a boolean, so
 * `isFormValid()` mutated state as a side effect of a *check* - and because an
 * effect re-ran them on every keystroke, typing produced several redundant
 * state updates per character.
 *
 * Keeping them pure also makes them directly testable.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const MIN_NAME_LENGTH = 2
export const MIN_MESSAGE_LENGTH = 10

export const FIELD_NAMES = ["name", "email", "message"]

export const validateName = (name = "") => {
    const trimmed = name.trim()
    if (!trimmed) return "Name is required"
    if (trimmed.length < MIN_NAME_LENGTH) {
        return `Name must be at least ${MIN_NAME_LENGTH} characters`
    }
    return ""
}

export const validateEmail = (email = "") => {
    const trimmed = email.trim()
    if (!trimmed) return "Email is required"
    if (!EMAIL_PATTERN.test(trimmed)) return "Please enter a valid email address"
    return ""
}

export const validateMessage = (message = "") => {
    const trimmed = message.trim()
    if (!trimmed) return "Message is required"
    if (trimmed.length < MIN_MESSAGE_LENGTH) {
        return `Message must be at least ${MIN_MESSAGE_LENGTH} characters`
    }
    return ""
}

export const VALIDATORS = {
    name: validateName,
    email: validateEmail,
    message: validateMessage,
}

/**
 * Validate one field.
 * @returns {string} The error message, or `""` when the value is valid.
 */
export const validateField = (field, value) =>
    VALIDATORS[field] ? VALIDATORS[field](value) : ""

/**
 * Validate every field at once.
 * @returns {Record<string, string>} Field name to error message (empty when valid).
 */
export const validateAll = (values = {}) =>
    FIELD_NAMES.reduce(
        (errors, field) => ({ ...errors, [field]: validateField(field, values[field]) }),
        {}
    )

/** `true` when every field has no error. */
export const isFormValid = (values = {}) =>
    FIELD_NAMES.every((field) => validateField(field, values[field]) === "")

/**
 * Decide which errors to show.
 *
 * Before the first submit attempt only fields the visitor has actually left get
 * flagged, so nobody is told "Email is required" before they have typed
 * anything. Once a submit has been attempted, every error stays live.
 *
 * @param {Record<string, boolean>} touched Fields the visitor has blurred.
 * @param {Record<string, string>} values Current form values.
 * @param {boolean} hasSubmitted Whether a submit has been attempted.
 */
export const selectVisibleErrors = (touched = {}, values = {}, hasSubmitted = false) => {
    if (hasSubmitted) return validateAll(values)

    return FIELD_NAMES.reduce((errors, field) => {
        errors[field] = touched[field] ? validateField(field, values[field]) : ""
        return errors
    }, {})
}