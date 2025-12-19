import "server-only"

const dictionaries = {
  "en-US": () => import("./dictionaries/en-US.json").then((module) => module.default),
  "zh-CN": () => import("./dictionaries/zh-CN.json").then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaries[locale]

  if (typeof loader !== "function") {
    console.error(`Dictionary for locale "${locale}" not found or is not a function.`)
    return dictionaries["en-US"]()
  }

  return loader()
}
