const wrapper = document.querySelector('.wrapper')
wrapper.addEventListener('click', (event) => {
  event.target.dataset.id === '1'
    ? new Pad(event.target).init()
    : event.target.dataset.id === '2'
    ? new Pad(event.target).newField().addEventListener('click', (event) => {
        let input,
          value = ''

        event.target.dataset.id &&
          (event.preventDefault(),
          (input = event.target.parentNode.querySelector('input')),
          (value = input.value))

        value.length <= 10 && value.length >= 3
          ? new Pad(event.target).init(value)
          : input
          ? new Promise((resolve) => {
              input.style.animation =
                'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
              setTimeout(() => {
                resolve()
              }, 800)
            }).then(() => {
              input.style.animation = ''
            })
          : void 0
      })
    : void 0
})
