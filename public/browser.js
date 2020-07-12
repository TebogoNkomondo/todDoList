document.addEventListener('click', (e) => {
  // delete feature
  if (e.target.classList.contains('delete-me')) {
    if (confirm('Are you sure you want to delete this item?')) {
      axios.post('/delete-item', { id: e.target.getAttribute('data-id') }).then(() => {
        e.target.parentElement.parentElement.remove()
      }).catch(() => {
        console.log('communication with server failed during delete')
      })
    }
  }
  // update feature
  if (e.target.classList.contains('edit-me')) {
    const userInput = prompt('Enter your desired new text', e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
    if (userInput) {
      axios.post('/update-item', { text: userInput, id: e.target.getAttribute('data-id') }).then(() => {
        e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput
      }).catch(() => {
        console.log('communication with server failed')
      })
    }
  }
})
