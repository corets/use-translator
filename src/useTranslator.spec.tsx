import React from "react"
import { createTranslator, ObservableTranslator } from "@corets/translator"
import { TranslatorContext, useTranslator } from "./index"
import { act, render, screen } from "@testing-library/react"

describe("useTranslator", () => {
  it("uses translator", () => {
    const translator = createTranslator(
      { en: { foo: "bar" }, de: { foo: "yolo" } },
      { language: "en", debounceChanges: 0 }
    )

    let renders = 0
    let receivedTranslator: ObservableTranslator

    const Test = () => {
      renders++
      receivedTranslator = useTranslator(translator)

      return (
        <h1>
          {receivedTranslator.getLanguage()} {receivedTranslator.get("foo")}
        </h1>
      )
    }

    render(<Test />)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("en bar")
    expect(translator.getLanguage()).toBe("en")
    expect(translator.get("foo")).toBe("bar")
    expect(renders).toBe(1)

    act(() => receivedTranslator.setLanguage("de"))

    expect(target).toHaveTextContent("de yolo")
    expect(translator.getLanguage()).toBe("de")
    expect(translator.get("foo")).toBe("yolo")
    expect(renders).toBe(2)

    act(() => translator.setLanguage("en"))

    expect(target).toHaveTextContent("en bar")
    expect(renders).toBe(3)

    act(() => translator.setLanguage("en"))

    expect(renders).toBe(3)
  })

  it("uses translator from context", () => {
    const translator = createTranslator(
      { en: { foo: "bar" }, de: { foo: "yolo" } },
      { language: "en", debounceChanges: 0 }
    )
    let renders = 0

    const Root = () => {
      return (
        <TranslatorContext.Provider value={translator}>
          <Test />
        </TranslatorContext.Provider>
      )
    }

    const Test = () => {
      renders++
      const translator = useTranslator()

      return (
        <h1>
          {translator.getLanguage()} {translator.get("foo")}
        </h1>
      )
    }

    render(<Root />)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("en bar")
    expect(renders).toBe(1)

    act(() => translator.setLanguage("de"))

    expect(target).toHaveTextContent("de yolo")
    expect(renders).toBe(2)
  })

  it("throws an error if translator context is empty", () => {
    const errorLog = console.error
    console.error = jest.fn()

    const Test = () => {
      useTranslator()

      return null
    }

    expect(() => render(<Test />)).toThrow()

    console.error = errorLog
  })
})
