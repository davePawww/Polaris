import { useColorMode } from '@vueuse/core'
import { computed, watch } from 'vue'

export function useTheme(defaultMode: 'light' | 'dark' = 'light') {
  // don't rely on selector; manage the html attribute explicitly
  const colorMode = useColorMode() // values: 'light' | 'dark' | 'system'

  // initialize if missing
  if (!document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', defaultMode)
    colorMode.value = defaultMode
  } else {
    // keep colorMode in sync if html already had a value
    const cur = document.documentElement.getAttribute('data-theme')
    if (cur === 'dark' || cur === 'light') colorMode.value = cur
  }

  // whenever colorMode changes, write a stable 'light'|'dark' to html
  watch(
    colorMode,
    (val) => {
      const mode = val === 'dark' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', mode)
    },
    { immediate: true },
  )

  // expose a boolean helper for dark mode
  const isDark = computed({
    get: () => colorMode.value === 'dark',
    set: (v: boolean) => (colorMode.value = v ? 'dark' : 'light'),
  })

  return { colorMode, isDark }
}
