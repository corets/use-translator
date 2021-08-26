import { ObservableTranslator } from "@corets/translator"
import { TranslatorContext } from "./TranslatorContext"
import React, { ReactNode } from "react"

export type TranslatorProviderProps = {
  instance: ObservableTranslator
  children?: ReactNode
}

export const TranslatorProvider = (props: TranslatorProviderProps) => {
  const { instance, children } = props

  return (
    <TranslatorContext.Provider value={instance}>
      {children}
    </TranslatorContext.Provider>
  )
}
