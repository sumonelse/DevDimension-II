import { describe, expect, it } from "vitest"
import personalInfo from "./personalInfo"

/**
 * Contact details, social links and the resume URL are interpolated into hrefs
 * and download attributes. A typo here is an invisible 404 on a portfolio, so
 * they are worth asserting on.
 */

describe("personalInfo", () => {
    it("exposes a name in two parts", () => {
        expect(personalInfo.name).toBeTruthy()
        expect(personalInfo.name.split(" ").length).toBeGreaterThanOrEqual(2)
    })

    it("has a title and a summary", () => {
        expect(personalInfo.title).toBeTruthy()
        expect(personalInfo.tagline).toBeTruthy()
        expect(personalInfo.aboutShort).toBeTruthy()
    })

    it("has a location and a copyright line", () => {
        expect(personalInfo.location).toBeTruthy()
        expect(personalInfo.copyright).toBeTruthy()
    })

    it("has a mailto link that matches the displayed address", () => {
        expect(personalInfo.contact.emailLink).toBe(
            `mailto:${personalInfo.contact.email}`
        )
        // The same address is exposed at the top level for the hero badge.
        expect(personalInfo.email).toBe(personalInfo.contact.email)
    })

    it("has a plausible email address", () => {
        expect(personalInfo.contact.email).toMatch(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        )
    })

    it("links every social profile over https", () => {
        for (const [name, profile] of Object.entries(personalInfo.social)) {
            expect(profile.url, `${name} is missing a url`).toBeTruthy()
            expect(profile.url, `${name} must be https`).toMatch(/^https:\/\//)
        }
    })

    it("gives every social profile an accessible label", () => {
        for (const [name, profile] of Object.entries(personalInfo.social)) {
            // The label is what screen readers announce on the icon-only link.
            expect(profile.label, `${name} is missing a label`).toBeTruthy()
            expect(profile.label.length).toBeGreaterThan(2)
        }
    })

    it("covers the profiles the site renders", () => {
        // Both contact sections render exactly these five.
        expect(Object.keys(personalInfo.social).sort()).toEqual(
            ["codechef", "codeforces", "github", "linkedin", "twitter"].sort()
        )
    })
})
