import React from "react"
import { useTranslate } from "./index"
import { createTranslator } from "@corets/translator"
import { act, render, screen } from "@testing-library/react"

describe("useTranslate", () => {
  it("uses translations", () => {
    const translator = createTranslator(
      { en: { key: "value" } },
      { language: "en" }
    )

    const Test = () => {
      const t = useTranslate(translator)

      return <h1>{t("key")}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("value")
  })

  it("uses translations with scope", () => {
    const translator = createTranslator(
      { en: { bar: { key: "foo" } } },
      { language: "en", debounceChanges: 0 }
    )

    const Test = () => {
      const t = useTranslate(translator, { scope: "bar" })

      return <h1>{t("key")}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
  })

  it("updates translations", async () => {
    const translator = createTranslator(
      { en: { bar: { key: "foo" } } },
      { language: "en", debounceChanges: 0 }
    )

    let renders = 0

    const Test = () => {
      renders++
      const t = useTranslate(translator, { scope: "bar" })

      return <h1>{t("key")}</h1>
    }

    render(<Test/>)

    const target = screen.getByRole("heading")

    expect(target).toHaveTextContent("foo")
    expect(renders).toBe(1)

    act(() => translator.addTranslations({ en: { bar: { key: "yolo" } } }))

    expect(target).toHaveTextContent("yolo")
    expect(renders).toBe(2)

    act(() => translator.addTranslations({ en: { ding: "dong" } }))

    expect(target).toHaveTextContent("yolo")
    expect(renders).toBe(3)

    act(() => translator.setTranslationsForLanguage("de", { foo: "bar" }))

    expect(target).toHaveTextContent("yolo")
    expect(renders).toBe(4)

    act(() =>
      translator.addTranslations({
        en: { bar: { key: "yolo" } },
        de: { foo: "bar" },
      })
    )

    expect(target).toHaveTextContent("yolo")
    expect(renders).toBe(4)

    act(() =>
      translator.addTranslations({
        en: { bar: { key: "swag" }, de: { foo: "bar" } },
      })
    )

    expect(target).toHaveTextContent("swag")
    expect(renders).toBe(5)
  })
})
