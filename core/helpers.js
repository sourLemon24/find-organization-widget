const FIELD_WIDTH = '320px'

export const debounce = (func, wait) => {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      func(...args)
    };
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const scalePage = () => {
  const siteWidth = parseFloat(FIELD_WIDTH) * 1.25
  const scale = screen.width /siteWidth
  const meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = `width=1280, initial-scale=1`
  document.head.prepend(meta)
  document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'')
}
  
export const addStyles = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '../core/styles.css'
  document.head.prepend(link)
}