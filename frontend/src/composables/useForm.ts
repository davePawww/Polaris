import { computed, reactive, ref, toRaw, watch } from 'vue'

export type ValidatorResult<T> = Partial<Record<keyof T, string>> | null
export type ValidatorFn<T> = (values: T) => ValidatorResult<T>

export function useForm<T extends Record<string, any>>(defaults: T) {
  const form = reactive<T>({ ...defaults } as T)
  let _defaults = { ...defaults } as T
  const errors = ref<Partial<Record<keyof T, string>>>({})

  const isDirty = computed(() => {
    const raw = toRaw(form)
    return Object.keys(_defaults).some((key) => (raw as any)[key] !== (_defaults as any)[key])
  })

  const touched = ref<Partial<Record<keyof T, boolean>>>({})

  function reset() {
    // copy defaults into form
    Object.keys(_defaults).forEach((k) => {
      ;(form as any)[k] = (_defaults as any)[k]
    })
    errors.value = {}
    touched.value = {}
  }

  function setDefaults(newDefaults: Partial<T>) {
    _defaults = { ..._defaults, ...newDefaults } as T
  }

  function setField<K extends keyof T>(key: K, value: T[K]) {
    ;(form as any)[key] = value
  }

  function getField<K extends keyof T>(key: K): T[K] {
    return (form as any)[key]
  }

  function setErrors(next: Partial<Record<keyof T, string>>) {
    errors.value = { ...next }
  }

  function clearErrors() {
    errors.value = {}
  }

  function touchField<K extends keyof T>(key: K) {
    touched.value = { ...touched.value, [key]: true }
  }

  function resetDirty() {
    _defaults = { ...toRaw(form) } as T
  }

  async function validate(validator?: ValidatorFn<T>) {
    if (!validator) {
      errors.value = {}
      return true
    }
    const result = await validator(toRaw(form as any))
    if (result && Object.keys(result).length > 0) {
      errors.value = { ...result }
      return false
    }
    errors.value = {}
    return true
  }

  watch(
    () => toRaw(form),
    (newVal) => {
      const curErrors = { ...errors.value }
      let changed = false
      Object.keys(curErrors).forEach((key) => {
        if ((newVal as any)[key] !== (_defaults as any)[key]) {
          delete curErrors[key as keyof T]
          changed = true
        }
      })
      if (changed) {
        errors.value = curErrors
      }
    },
    { deep: true },
  )

  return {
    form,
    errors,
    touched,
    isDirty,
    reset,
    setDefaults,
    setField,
    getField,
    setErrors,
    clearErrors,
    touchField,
    resetDirty,
    validate,
  }
}
