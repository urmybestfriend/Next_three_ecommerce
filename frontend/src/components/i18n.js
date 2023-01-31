import i18n from "i18next"
import { initReactI18next, Backend, LanguageDetector } from "react-i18next"
import common_en from "../data/translations/en.json"
import common_de from "../data/translations/de.json"

const resources = {
  en: { translation: common_en },
  de: { translation: common_de },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
