import { useTranslate } from "./index"
import { mount } from "enzyme"
import React from "react"
import { createTranslator } from "@corets/translator"
import { act } from "react-dom/test-utils"

describe("useTranslate", () => {
  it("uses translations", () => {
    const translator = createTranslator({ en: { key: "value" } }, "en")

    const Test = () => {
      const t = useTranslate(translator)

      return <h1>{t("key")}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("value")
  })

  it("uses translations with scope", () => {
    const translator = createTranslator({ en: { bar: { key: "foo" } } }, "en")

    const Test = () => {
      const t = useTranslate(translator, "bar")

      return <h1>{t("key")}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
  })

  it("updates translations", async () => {
    const translator = createTranslator({ en: { bar: { key: "foo" } } }, "en")

    let renders = 0

    const Test = () => {
      renders++
      const t = useTranslate(translator, "bar")

      return <h1>{t("key")}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
    expect(renders).toBe(1)

    act(() => translator.addTranslations({ en: { bar: { key: "yolo" } } }))

    expect(target().text()).toBe("yolo")
    expect(renders).toBe(2)

    act(() => translator.addTranslations({ en: { ding: "dong" } }))

    expect(target().text()).toBe("yolo")
    expect(renders).toBe(3)

    act(() => translator.setTranslationsForLanguage("de", { foo: "bar" }))

    expect(target().text()).toBe("yolo")
    expect(renders).toBe(4)

    act(() =>
      translator.addTranslations({
        en: { bar: { key: "yolo" } },
        de: { foo: "bar" },
      })
    )

    expect(target().text()).toBe("yolo")
    expect(renders).toBe(4)

    act(() =>
      translator.addTranslations({
        en: { bar: { key: "swag" }, de: { foo: "bar" } },
      })
    )

    expect(target().text()).toBe("swag")
    expect(renders).toBe(5)
  })
})
