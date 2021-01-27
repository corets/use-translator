import {
  ObservableTranslator,
  TranslateFunction,
  TranslateFunctionFactoryOptions,
} from "@corets/translator"

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
  options?: TranslateFunctionFactoryOptions
) => TranslateFunction
export type UseLanguage = (
  translator?: ObservableTranslator
) => TranslatorLanguage
