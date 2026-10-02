import { describe, expect, it } from "vitest"
import {
    FIELD_NAMES,
    MIN_MESSAGE_LENGTH,
    MIN_NAME_LENGTH,
    isFormValid,
    selectVisibleErrors,
    validateAll,
    validateEmail,
    validateField,
    validateMessage,
    validateName,
} from "./validation"

describe("validateName", () => {
    it("requires a value", () => {
        expect(validateName("")).toBe("Name is required")
        expect(validateName("   ")).toBe("Name is required")
    })

    it(`enforces a minimum length of ${MIN_NAME_LENGTH}`, () => {
        expect(validateName("a")).toBe(
            `Name must be at least ${MIN_NAME_LENGTH} characters`
        )
        expect(validateName("ab")).toBe("")
    })

    it("measures the trimmed value, not the raw one", () => {
        expect(validateName("  ab  ")).toBe("")
    })

    it("returns an empty string when valid", () => {
        expect(validateName("Sumit")).toBe("")
    })
})

describe("validateEmail", () => {
    it("requires a value", () => {
        expect(validateEmail("")).toBe("Email is required")
        expect(validateEmail("   ")).toBe("Email is required")
    })

    it("rejects addresses without a domain", () => {
        expect(validateEmail("sumit@example")).toBe(
            "Please enter a valid email address"
        )
        expect(validateEmail("sumit@")).toBe(
            "Please enter a valid email address"
        )
        expect(validateEmail("@example.com")).toBe(
            "Please enter a valid email address"
        )
    })

    it("rejects values containing whitespace", () => {
        expect(validateEmail("sumit @example.com")).toBe(
            "Please enter a valid email address"
        )
    })

    it("accepts a normal address", () => {
        expect(validateEmail("sumit@example.com")).toBe("")
    })
})

describe("validateMessage", () => {
    it("requires a value", () => {
        expect(validateMessage("")).toBe("Message is required")
    })

    it(`enforces a minimum length of ${MIN_MESSAGE_LENGTH}`, () => {
        expect(validateMessage("short")).toBe(
            `Message must be at least ${MIN_MESSAGE_LENGTH} characters`
        )
        expect(validateMessage("this message is long enough")).toBe("")
    })
})

describe("validateField", () => {
    it("dispatches to the right validator", () => {
        expect(validateField("name", "ab")).toBe("")
        expect(validateField("email", "a@b.co")).toBe("")
        expect(validateField("message", "a message here")).toBe("")
    })

    it("treats unknown fields as valid rather than throwing", () => {
        expect(validateField("subject", "")).toBe("")
    })
})

describe("validateAll", () => {
    it("reports every field at once", () => {
        expect(validateAll({ name: "", email: "nope", message: "" })).toEqual({
            name: "Name is required",
            email: "Please enter a valid email address",
            message: "Message is required",
        })
    })

    it("reports an empty value for every field when given nothing", () => {
        expect(validateAll()).toEqual({
            name: "Name is required",
            email: "Email is required",
            message: "Message is required",
        })
    })

    it("covers exactly the three validated fields", () => {
        expect(Object.keys(validateAll({})).sort()).toEqual([...FIELD_NAMES].sort())
    })
})

describe("isFormValid", () => {
    it("is false when any field is invalid", () => {
        expect(
            isFormValid({ name: "ab", email: "a@b.co", message: "hi" })
        ).toBe(false)
    })

    it("is true when every field is valid", () => {
        expect(
            isFormValid({
                name: "Sumit",
                email: "a@b.co",
                message: "a message here",
            })
        ).toBe(true)
    })
})

describe("selectVisibleErrors", () => {
    const values = { name: "Sumit", email: "sumit@example.com", message: "hello there" }

    it("hides errors for fields nobody has touched yet", () => {
        // The key behaviour: nobody is told "Email is required" before they
        // have typed anything.
        expect(selectVisibleErrors({}, values, false)).toEqual({
            name: "",
            email: "",
            message: "",
        })
    })

    it("shows the error for a field that was touched and is empty", () => {
        expect(selectVisibleErrors({ name: true }, values, false)).toEqual({
            name: "",
            email: "",
            message: "",
        })

        expect(
            selectVisibleErrors({ name: true }, { ...values, name: "a" }, false)
        ).toEqual({
            name: `Name must be at least ${MIN_NAME_LENGTH} characters`,
            email: "",
            message: "",
        })
    })

    it("shows every error once a submit has been attempted, even untouched ones", () => {
        const errors = selectVisibleErrors(
            { name: true },
            { name: "S", email: "", message: "" },
            true
        )

        expect(errors.name).toBe(
            `Name must be at least ${MIN_NAME_LENGTH} characters`
        )
        expect(errors.email).toBe("Email is required")
        expect(errors.message).toBe("Message is required")
    })
})
