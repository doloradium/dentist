'use client'

export function YandexMap() {
  return (
    <iframe
      src="https://yandex.ru/map-widget/v1/?ll=39.314272%2C48.571512&z=17&pt=39.314272%2C48.571512%2Cpm2rdm&lang=ru_RU"
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      title="Карта"
      className='min-h-[400px]'
    />
  )
}
