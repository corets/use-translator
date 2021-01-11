import { createContext } from "react"
import { ObservableTranslator } from "@corets/translator"

export const TranslatorContext = createContext<ObservableTranslator | null>(
  null
)
