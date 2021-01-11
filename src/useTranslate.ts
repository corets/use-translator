import { UseTranslate } from "./types"
import { useTranslator } from "./useTranslator"

export const useTranslate: UseTranslate = (translator, scope = "") => {
  translator = useTranslator(translator)

  return translator.scope(scope)
}
