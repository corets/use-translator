import { useTranslator } from "./useTranslator"
import { createTranslator } from "@corets/translator"
import React from "react"
import { TranslatorProvider } from "./TranslatorProvider"
import { render, screen } from "@testing-library/react"

describe("TranslatorProvider", () => {
  it("shares translator instance through the context", () => {
    const translator = createTranslator(
      { en: { foo: "bar" } },
      { language: "en" }
    )

    const Test = () => {
      const t = useTranslator()

      return <div>{t.get("foo")}</div>
    }

    render(
      <TranslatorProvider instance={translator}>
        <Test />
      </TranslatorProvider>
    )

    expect(screen.getByText("bar")).toBeInTheDocument()
  })
})
