import { defineConfig, presetAttributify, presetIcons, presetUno, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
    presetIcons({ /* options */ }),
  ],
  transformers: [
    transformerAttributifyJsx(), // <--
  ],
})
