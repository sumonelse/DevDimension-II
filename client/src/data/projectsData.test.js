import { describe, expect, it } from "vitest"
import { projects, fetchProjects } from "./projectsData"

/**
 * `projectsData` drives the project grid, the filters and both modals. Much of
 * it is interpolated into class names at runtime, for example
 * `border-${project.color}-500/20`. Tailwind can only see literal class names
 * when it scans the source, so a colour or category that is not declared in
 * `tailwind.config.js` fails silently: the markup is still emitted, it is just
 * unstyled. These tests are the tripwire for that.
 */

const CATEGORIES = ["fullstack", "frontend", "backend", "ai"]
const COLORS = ["purple", "pink", "cyan", "yellow"]

const hasLinks = (project) =>
    project.links === undefined ||
    (Array.isArray(project.links) && project.links.length > 0)

describe("projects data", () => {
    it("is not empty", () => {
        expect(Array.isArray(projects)).toBe(true)
        expect(projects.length).toBeGreaterThan(0)
    })

    it("gives every project a title and description", () => {
        for (const project of projects) {
            expect(project.title, `project ${project.id}`).toBeTruthy()
            expect(project.description, `project ${project.id}`).toBeTruthy()
        }
    })

    it("uses only categories the filter UI offers", () => {
        for (const project of projects) {
            expect(CATEGORIES, `project ${project.title}`).toContain(
                project.category
            )
        }
    })

    it("uses only colours that exist in the Tailwind palette", () => {
        for (const project of projects) {
            expect(COLORS, `project ${project.title}`).toContain(project.color)
        }
    })

    it("never reuses a title", () => {
        const titles = projects.map((p) => p.title)
        expect(new Set(titles).size).toBe(titles.length)
    })

    it("has links whenever a links key is present", () => {
        for (const project of projects) {
            expect(
                hasLinks(project),
                `project ${project.title} has an empty links array`
            ).toBe(true)
        }
    })

    it("uses absolute https URLs for external links", () => {
        for (const project of projects) {
            for (const link of project.links ?? []) {
                if (!link.url) continue
                expect(
                    link.url,
                    `project ${project.title} link ${link.url}`
                ).toMatch(/^https?:\/\//)
            }
        }
    })
})

describe("fetchProjects", () => {
    it("resolves to the same data it is standing in for", async () => {
        // The project is still hard-coded, so the "API" must be a pass-through.
        // If this ever stops being true, a loading state needs handling.
        await expect(fetchProjects()).resolves.toEqual(projects)
    })

    it("resolves rather than rejects, so callers need no try/catch", async () => {
        await expect(fetchProjects()).resolves.toBeInstanceOf(Array)
    })
})
