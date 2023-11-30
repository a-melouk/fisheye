function mediaLinkListener(mediaLinks, link) {
  let currentMediaIndex = mediaLinks.indexOf(link)

  //mediaFile is the image or video
  const mediaFile = link.children[0]
  const title = link.getAttribute('aria-label')
  handleLightbox(currentMediaIndex, mediaLinks)
  openLightBox()
  changeLightboxMedia(mediaFile, title)
}

function handleLightbox(currentMediaIndex, mediaLinks) {
  const mediasCount = document.querySelector('.medias').childElementCount
  const previousMedia = document.querySelector('.previous-button')
  const nextMedia = document.querySelector('.next-button')
  const closeButton = document.querySelector('.close-button')

  previousMedia.addEventListener('click', () => {
    currentMediaIndex--
    if (currentMediaIndex < 0) currentMediaIndex = mediasCount - 1
    const previousMediaFile = mediaLinks[currentMediaIndex].children[0]
    const previousMediaTitle = mediaLinks[currentMediaIndex].getAttribute('aria-label')
    changeLightboxMedia(previousMediaFile, previousMediaTitle)
  })

  nextMedia.addEventListener('click', () => {
    currentMediaIndex++
    if (currentMediaIndex > mediasCount - 1) currentMediaIndex = 0
    const nextMediaFile = mediaLinks[currentMediaIndex].children[0]
    const nextMediaTitle = mediaLinks[currentMediaIndex].getAttribute('aria-label')
    changeLightboxMedia(nextMediaFile, nextMediaTitle)
  })

  closeButton.addEventListener('click', () => {
    closeLightBox()
    resetLightbox()
  })

  //Navigation with keyboard
  document.addEventListener('keydown', e => {
    const key = e.key
    if (key === 'ArrowLeft') previousMedia.click()
    else if (key === 'ArrowRight') nextMedia.click()
    else if (key === 'Escape') {
      closeLightBox()
      resetLightbox()
    }
  })
}

function changeLightboxMedia(mediaFile, title) {
  resetLightbox()
  const lightbox = document.querySelector('.lightbox')
  if (mediaFile.tagName === 'IMG') {
    const img = document.createElement('img')
    img.src = mediaFile.src
    img.alt = mediaFile.alt
    img.classList.add('lightbox-media')
    lightbox.appendChild(img)
  } else if (mediaFile.tagName === 'VIDEO') {
    const video = document.createElement('video')
    video.setAttribute('controls', '')
    const source = document.createElement('source')
    source.src = document.querySelector('source').src
    video.appendChild(source)
    video.classList.add('lightbox-media')
    lightbox.appendChild(video)
  }
  const titleP = document.querySelector('.lightbox-title')
  titleP.innerHTML = title
}

function resetLightbox() {
  //Delete the media in the lightbox if there is one
  if (document.querySelector('.lightbox-media') !== null) {
    document.querySelector('.lightbox').removeChild(document.querySelector('.lightbox-media'))
  }
}

function openLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  const main = document.querySelector('main')
  const headerPortfolio = document.querySelector('.header-portfolio')

  lightboxContainer.classList.replace('closed', 'opened')
  lightboxContainer.setAttribute('aria-hidden', 'false')
  lightboxContainer.setAttribute('tabindex', '0')

  main.setAttribute('aria-hidden', 'true')
  main.setAttribute('tabindex', '-1')
  main.classList.add('hidden')

  headerPortfolio.setAttribute('aria-hidden', 'true')
  headerPortfolio.setAttribute('tabindex', '-1')
  headerPortfolio.classList.add('hidden')
}

function closeLightBox() {
  const lightboxContainer = document.querySelector('.lightbox-container')
  const main = document.querySelector('main')
  const headerPortfolio = document.querySelector('.header-portfolio')

  lightboxContainer.classList.replace('opened', 'closed')
  lightboxContainer.setAttribute('aria-hidden', 'true')
  lightboxContainer.setAttribute('tabindex', '-1')

  main.setAttribute('aria-hidden', 'false')
  main.setAttribute('tabindex', '0')
  main.classList.remove('hidden')

  headerPortfolio.setAttribute('aria-hidden', 'false')
  headerPortfolio.setAttribute('tabindex', '0')
  headerPortfolio.classList.remove('hidden')
}

export { mediaLinkListener }
