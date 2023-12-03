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
//Get the displayed/selected item (not from the menu)
const currentSelectedItem = document.querySelector('.menu-item-selected')
const menuItemsContainer = document.querySelector('.menu-items')
let menuItems = document.querySelectorAll('.menu-item')
currentSelectedItem.addEventListener('click', () => {
  //Get the first item in the menu
  const firstItem = document.querySelector('.first-item')

  //Rotate the arrow of the first item (because menu is opened)
  firstItem.children[0].classList.add('fa-rotate-180')

  //Display the menu
  menuItemsContainer.classList.replace('closed', 'opened')
  //Hise the arrow of the selected item (because menu is opened)
  currentSelectedItem.classList.add('hidden')
  //Set aria-expanded to true for accessibility
  menuItemsContainer.setAttribute('aria-expanded', 'true')
  const menuOpened = menuItemsContainer.getAttribute('aria-expanded')
  if (menuOpened === 'true') {
    firstItem.focus()
    let currentItemIndex = Array.from(menuItems).indexOf(firstItem)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        menuItemsContainer.classList.replace('opened', 'closed')
        currentSelectedItem.classList.remove('hidden')
        menuItemsContainer.setAttribute('aria-expanded', 'false')
      } else if (e.key === 'ArrowDown') {
        e.stopPropagation()
        if (currentItemIndex < menuItems.length - 1) {
          currentItemIndex++
          menuItems[currentItemIndex].focus()
        }
      } else if (e.key === 'ArrowUp') {
        e.stopPropagation()
        if (currentItemIndex > 0) {
          currentItemIndex--
          menuItems[currentItemIndex].focus()
        }
      }
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

    currentSelectedItem.innerHTML = menuItem.innerHTML
    currentSelectedItem.classList.remove('hidden')
    document.querySelector('.select-menu').setAttribute('aria-activedescendant', menuItem.id)

    menuItemsContainer.classList.replace('opened', 'closed')
    menuItemsContainer.setAttribute('aria-expanded', 'false')
    menuItemsContainer.prepend(menuItem)
    menuItems = document.querySelectorAll('.menu-item')

    sortMedias(menuItem.textContent.trim())
  })
})
