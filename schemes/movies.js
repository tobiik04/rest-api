/* eslint-disable space-before-function-paren */
const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'El poster debe ser un url valido'
  }),
  genre: z.array(
    z.string(
      z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror']),
      {
        required_error: 'el genero debe ser ingresado',
        invalid_type_error: 'el genero debe coincidir con los tipos'
      }
    )
  )
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
