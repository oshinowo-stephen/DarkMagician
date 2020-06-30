export const isEmpty =(
  input: any
): boolean => {
  if (typeof input === 'number') {
    return input === 0
  } else if (typeof input === 'string') {
    return input.length === 0
  } else if (input instanceof Map) {
    return input.size === 0
  } else if (input instanceof Object) {
    return Object.keys(input).length === 0
  } else {
    return false
  }
}
