import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post (Blog)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Extracto', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
});
