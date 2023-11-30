//Mettre le code JavaScript lié à la page photographer.html

import Media from '../pages/Media.js'
import { mediaLinkListener } from './Lightbox.js'
import { likeMedia } from './Likes.js'

export function getIdFromURL() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  return id
}

const currentPhotographerId = getIdFromURL()
portfolioTemplate(currentPhotographerId)

async function portfolioTemplate(id) {
  const photographerData = JSON.parse(sessionStorage.getItem(id))
  const mediasJsonData = await getMediasById(id)

  //Generating HTML content
  generateHeader(photographerData)
  generateMediasSections(mediasJsonData, photographerData.name)
  generatePriceLikesAnchor(photographerData.price)

  const mediaLinks = Array.from(document.querySelectorAll('.medias article a'))
  mediaLinks.forEach(link => {
    link.addEventListener('click', () => mediaLinkListener(mediaLinks, link))
  })

  // handleLightbox()
  likeMedia()
}

//Function to fetch medias from local JSON file
async function getMediasById(id) {
  const url = './data/photographers.json'
  let response = await fetch(url)
  let data = await response.json()
  const photographerMedias = data.media.filter(media => media.photographerId == id)
  return photographerMedias
}

function generateHeader(photographerData) {
  const contactBtn = document.getElementById('open-modal-btn').cloneNode(true)
  const photographHeader = document.querySelector('.photograph-header')
  photographHeader.innerHTML = ''
  photographHeader.innerHTML = `
  <div class="photographer-profile">
    <h1 class='photographer-name'>${photographerData.name}</h1>
    <h2 class="location">${photographerData.city}, ${photographerData.country}</h2>
    <h3 class="tag">${photographerData.tagline}</h3>
  </div>
  ${contactBtn.outerHTML}
  <img class='profile-picture' src="assets/photographers/${photographerData.portrait}" alt="${photographerData.name}">
  `
}

function generateMediasSections(mediasJsonData, photographerName) {
  const mediaDiv = document.querySelector('.medias')
  mediasJsonData.forEach(mediaItem => {
    const mediaObject = new Media(mediaItem, photographerName)
    const mediaHTML = mediaObject.createMedia()
    mediaDiv.appendChild(mediaHTML)
  })
}

function generatePriceLikesAnchor(price) {
  let totalLikes = 0
  document.querySelectorAll('.media-likes .number-likes').forEach(mediaLikes => (totalLikes += parseInt(mediaLikes.textContent)))

  const sticky = document.querySelector('.sticky')
  sticky.innerHTML = `
  <div class='total-likes' aria-label='Nombre total de Likes'>
    <h3 class='number-likes'>${totalLikes}</h3>
    <span class='fa-solid fa-heart' aria-hidden='true'></span>
  </div>
  <h3 class='price' aria-label='Tarif journalier'>${price}€ / jour</h3>
  `
}
