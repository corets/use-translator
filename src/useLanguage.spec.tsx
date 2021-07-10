import React from "react"
import { TranslatorLanguage, useLanguage } from "./index"
import { createTranslator } from "@corets/translator"
import { act, render, screen } from "@testing-library/react"

describe("useLanguage", () => {
  it("uses language", () => {
    const translator = createTranslator(
      { en: { key: "value-en" }, de: { key: "value-de" } },
      { language: "en", fallbackLanguage: "de", debounceChanges: 0 }
    )
    let receivedLanguage: TranslatorLanguage

    const Test = () => {
      const language = useLanguage(translator)
      receivedLanguage = language

      return <h1>{language.current}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(receivedLanguage!).not.toBeUndefined()
    expect(target).toHaveTextContent("en")
    expect(receivedLanguage!.current).toBe("en")
    expect(receivedLanguage!.fallback).toBe("de")
    expect(receivedLanguage!.available).toEqual(["en", "de"])

    act(() => {
      receivedLanguage.set("de")
    })

    expect(target).toHaveTextContent("de")
    expect(translator.getLanguage()).toBe("de")
  })
})
