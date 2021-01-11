import { ObservableTranslator, TranslateFunction } from "@corets/translator"

export type TranslatorLanguage = {
  current: string
  fallback: string | undefined
  available: string[]
  set: (language: string) => void
}

export type UseTranslator = (
  translator?: ObservableTranslator
) => ObservableTranslator
export type UseTranslate = (
  translator?: ObservableTranslator,
  scope?: string
) => TranslateFunction
export type UseLanguage = (
  translator?: ObservableTranslator
) => TranslatorLanguage
