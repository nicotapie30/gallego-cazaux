import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pregunta', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Compra', value: 'compra' },
          { title: 'Alquiler', value: 'alquiler' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      initialValue: 'general',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
});
