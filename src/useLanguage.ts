import { UseLanguage } from "./types"
import { useTranslator } from "./useTranslator"

export const useLanguage: UseLanguage = (translator) => {
  translator = useTranslator(translator)

  return {
    current: translator.getLanguage(),
    fallback: translator.getFallbackLanguage(),
    available: translator.getLanguages(),
    set: (language: string) => translator!.setLanguage(language),
  }
}
