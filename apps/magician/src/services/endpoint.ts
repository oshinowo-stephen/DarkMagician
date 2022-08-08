export const toPascel = (s: string): string =>
    s.replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())

