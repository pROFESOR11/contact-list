export const getFullName = ({ name, lastName }: { name: string; lastName?: string }): string => {
  return `${name}${lastName ? ' ' + lastName : ''}`
}

export const getFirstLettersOfFullName = ({ name, lastName }: { name: string; lastName?: string }): string => {
  const fullName = getFullName({ name, lastName })
  return fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}
