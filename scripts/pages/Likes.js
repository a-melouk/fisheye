function likeMedia() {
  const likeButtons = document.querySelectorAll('.media-likes .fa-heart')

  likeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isLiked = button.getAttribute('liked')
      if (isLiked === 'false') {
        button.classList.add('liked')
        const numberOfLikes = parseInt(button.previousElementSibling.textContent)
        button.previousElementSibling.textContent = numberOfLikes + 1
        const totalLikes = document.querySelector('.total-likes .number-likes')
        totalLikes.textContent = parseInt(totalLikes.textContent) + 1
        button.setAttribute('liked', 'true')
      } else {
        button.classList.remove('liked')
        const numberOfLikes = parseInt(button.previousElementSibling.textContent)
        button.previousElementSibling.textContent = numberOfLikes - 1
        const totalLikes = document.querySelector('.total-likes .number-likes')
        totalLikes.textContent = parseInt(totalLikes.textContent) - 1
        button.setAttribute('liked', 'false')
      }
    })
  })
}

export { likeMedia }
