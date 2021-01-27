import { UseTranslate } from "./types"
import { useTranslator } from "./useTranslator"

export const useTranslate: UseTranslate = (translator, options) =>
  useTranslator(translator).t(options)
