export function smoothScrollToId(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function smoothScrollToSection(sectionName: string) {
  const id = sectionName.toLowerCase().replace(/\s+/g, '-')
  smoothScrollToId(id)
}
