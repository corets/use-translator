import { useValue } from "@corets/use-value"
import { UseTranslator } from "./types"
import { useContext } from "react"
import { TranslatorContext } from "./TranslatorContext"

export const useTranslator: UseTranslator = (translator) => {
  if (!translator) {
    const translatorFromContext = useContext(TranslatorContext)

    if (translatorFromContext) {
      translator = translatorFromContext
    } else {
      throw new Error(
        "You must provide a translator instance or initialize TranslatorContext before using it"
      )
    }
  }

  useValue(translator.translations)
  useValue(translator.language)
  useValue(translator.fallbackLanguage)

  return translator
}
