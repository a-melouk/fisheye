function sortMedias(criteria) {
  const mediaDiv = document.querySelector('.medias')
  const articles = Array.from(mediaDiv.children)
  switch (criteria) {
    case 'Popularité':
      articles.sort((a, b) => sortMediasByLikes(a, b))
      break
    case 'Date':
      articles.sort((a, b) => sortMediasByDate(a, b))
      break
    case 'Titre':
      articles.sort((a, b) => sortMediasByTitle(a, b))
      break
    default:
      console.error('Pas de critère')
  }
  mediaDiv.innerHTML = ''
  articles.forEach(media => mediaDiv.appendChild(media))
}

function sortMediasByLikes(a, b) {
  //Sort from the most liked to the least liked
  const aLikes = a.querySelector('.media-likes .number-likes').textContent
  const bLikes = b.querySelector('.media-likes .number-likes').textContent
  return bLikes - aLikes
}

function sortMediasByDate(a, b) {
  //Sort from the most recent to the oldest
  const aDate = new Date(a.querySelector('.media-info .date').textContent)
  const bDate = new Date(b.querySelector('.media-info .date').textContent)
  return bDate - aDate
}

function sortMediasByTitle(a, b) {
  //Sort alphabetically (A-Z)
  const aTitle = a.querySelector('.media-info .title').textContent
  const bTitle = b.querySelector('.media-info .title').textContent
  return aTitle.localeCompare(bTitle)
}

const selectedItem = document.querySelector('.menu-item-selected')
const menuItemsContainer = document.querySelector('.menu-items')
const menuItems = document.querySelectorAll('.menu-item')
selectedItem.addEventListener('click', () => {
  const firstItem = document.querySelector('.first-item')
  firstItem.children[0].classList.add('fa-rotate-180')
  menuItemsContainer.classList.replace('closed', 'opened')
  selectedItem.classList.add('hidden')
  menuItemsContainer.setAttribute('aria-expanded', 'true')
  const menuOpened = menuItemsContainer.getAttribute('aria-expanded')
  if (menuOpened === 'true') {
    menuItemsContainer.focus()
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        menuItemsContainer.classList.replace('opened', 'closed')
        selectedItem.classList.remove('hidden')
        menuItemsContainer.setAttribute('aria-expanded', 'false')
      }
      /* else if (e.key === 'ArrowDown') {
        e.preventDefault()
        const firstItem = document.querySelector('.first-item')
        firstItem.classList.remove('first-item')
        firstItem.nextElementSibling.focus()
        firstItem.nextElementSibling.classList.add('first-item')
      } else if (e.key === 'ArrowUp') {
        const lastItem = document.querySelector('.last-item')
        lastItem.previousElementSibling.focus()
      } */
    })
  }
})

menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', () => {
    const firstItem = document.querySelector('.first-item')

    //Remove order:0 from the first item
    firstItem.classList.remove('first-item')

    //Hide the first item's arrow
    firstItem.children[0].classList.replace('shown', 'hidden')
    firstItem.removeAttribute('aria-haspopup')

    //Add order:0 to the selected item
    menuItem.classList.add('first-item')

    //Show the selected item's arrow
    menuItem.children[0].classList.replace('hidden', 'shown')
    menuItem.children[0].classList.remove('fa-rotate-180')
    menuItem.setAttribute('aria-haspopup', 'true')

    selectedItem.innerHTML = menuItem.innerHTML
    selectedItem.classList.remove('hidden')
    document.querySelector('.select-menu').setAttribute('aria-activedescendant', menuItem.id)

    menuItemsContainer.classList.replace('opened', 'closed')
    menuItemsContainer.setAttribute('aria-expanded', 'false')
    menuItemsContainer.prepend(menuItem)

    sortMedias(menuItem.textContent.trim())
  })
})
