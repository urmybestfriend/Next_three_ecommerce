import Image from "next/image"
import i18next from "i18next"

export const Nodata = () => {
  return (
    <div className="d-flex flex-column align-item-center justify-content-evenly">
      <Image
        src="/assets/illustrations/character-3.svg"
        alt="image Logo"
        width={400}
        height={380}
        className="mt-4 mb-4 text-center"
      />
      <span className="text-center mt-4">{i18next.t("no_data")}.</span>
    </div>
  )
}
