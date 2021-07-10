import { UseTranslator } from "./types"
import { useContext, useEffect, useState } from "react"
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

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return translator!.listen(() => setReference((previous) => previous + 1), {
      immediate: false,
    })
  }, [])

  return translator
}
