import React from "react"
import { TranslatorLanguage, useLanguage } from "./index"
import { mount } from "enzyme"
import { createTranslator } from "@corets/translator"
import { act } from "react-dom/test-utils"

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

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(receivedLanguage!).not.toBeUndefined()
    expect(target().text()).toBe("en")
    expect(receivedLanguage!.current).toBe("en")
    expect(receivedLanguage!.fallback).toBe("de")
    expect(receivedLanguage!.available).toEqual(["en", "de"])

    act(() => {
      receivedLanguage.set("de")
    })

    expect(target().text()).toBe("de")
    expect(translator.getLanguage()).toBe("de")
  })
})
