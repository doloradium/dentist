import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    prices: collection({
      label: 'Прайс-лист',
      slugField: 'title',
      path: 'content/prices/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({
          name: { label: 'Название услуги' },
        }),
        category: fields.select({
          label: 'Категория',
          options: [
            { label: 'Терапия', value: 'therapy' },
            { label: 'Хирургия', value: 'surgery' },
            { label: 'Ортопедия', value: 'orthopedics' },
            { label: 'Ортодонтия', value: 'orthodontics' },
            { label: 'Гигиена', value: 'hygiene' },
          ],
          defaultValue: 'therapy',
        }),
        price: fields.number({
          label: 'Цена (₽)',
          validation: { isRequired: true, min: 0 },
        }),
        priceFrom: fields.checkbox({
          label: 'Цена "от"',
          defaultValue: false,
        }),
        description: fields.text({
          label: 'Описание',
          multiline: true,
        }),
        visible: fields.checkbox({
          label: 'Показывать в прайсе',
          defaultValue: true,
        }),
      },
    }),
  },
})
