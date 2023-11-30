function displayModal() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get('id')
  const name = JSON.parse(sessionStorage.getItem(id)).name

  const contactMe = document.getElementById('modal-header')
  contactMe.innerHTML = `Contactez-moi <br>${name}`

  const main = document.querySelector('main')
  const body = document.querySelector('body')
  body.classList.add('no-scroll')
  document.querySelector('.sticky').classList.replace('displayed-scrollbar', 'hidden-scrollbar')
  main.setAttribute('aria-hidden', 'true')
  main.setAttribute('tabindex', '-1')
  main.classList.replace('opened', 'closed')

  const closeBtn = document.getElementById('close-modal-btn')
  closeBtn.focus()

  const modal = document.querySelector('.modal-container')
  modal.classList.replace('closed', 'opened')
  modal.setAttribute('aria-hidden', 'false')
  modal.setAttribute('tabindex', '0')

  document.addEventListener('keydown', e => {
    const key = e.key
    if (modal.getAttribute('aria-hidden') == 'false' && key === 'Escape') closeModal()
  })

  const envoyer = document.querySelector('form button')
  envoyer.addEventListener('click', e => {
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const prenom = inputs[0].value
    const nom = inputs[1].value
    const email = inputs[2].value
    const message = document.querySelector('textarea').value
    //Créer une fonction pour tout
    console.log(`Nom: ${nom} \nPrénom: ${prenom} \nEmail: ${email} \nMessage: ${message}`)
    closeModal()
  })
}

function closeModal() {
  const main = document.querySelector('main')
  const body = document.querySelector('body')
  body.classList.remove('no-scroll')
  main.setAttribute('aria-hidden', 'false')
  document.querySelector('.sticky').classList.replace('hidden-scrollbar', 'displayed-scrollbar')

  const modal = document.querySelector('.modal-container')
  modal.classList.replace('opened', 'closed')
  modal.setAttribute('aria-hidden', 'true')
  modal.setAttribute('tabindex', '-1')
  main.setAttribute('tabindex', '0')
  main.classList.replace('closed', 'opened')

  const contactBtn = document.querySelector('.contact-button')
  contactBtn.focus()
}
