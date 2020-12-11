class Pad {
  values = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  defaultValue = 'dfghjk'
  constructor(buttonId) {
    this.buttonId = buttonId
    this.menu = document.querySelector('.wrapper')
    this.counter = 0
    this.minutes = 0
    this.seconds = 0
  }
  init(value = this.defaultValue) {
    if (document.querySelector('.main-app')) {
      document.querySelector('.main-app').remove()
      this.render(value)
    } else {
      this.deleteMenu()
      this.timer()
      this.render(value)
    }
  }
  deleteMenu() {
    this.menu.remove()
  }
  timer() {
    if (this.seconds >= 60) {
      this.minutes++
      this.seconds = 0
    }

    setInterval(() => {
      this.seconds++
    }, 1000)

    return {
      minutes: this.minutes,
      seconds: this.seconds,
    }
  }
  render(value) {
    const container = document.createElement('div')
    container.classList.add('wrapper', 'main-app')
    container.style.minHeight = '400px'
    const log = value
      .split('')
      .forEach((i) =>
        container.insertAdjacentHTML(
          'beforeend',
          `<div class="box"><span class="box__item">${i}</span></div>          `
        )
      )
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="score">score: ${this.counter++}</div>`
    )
    document.body.appendChild(container)
    const _list = container.querySelectorAll('.box>.box__item')
    this.eventHandler(_list)
    if (this.isGameOver(this.counter)) {
      container.remove()
      alert(
        `score: ${this.counter} | time: ${this.timer().minutes}:${
          this.timer().seconds
        }`
      )
    }
  }
  newField() {
    const tempDiv = document.createElement('div')
    tempDiv.classList.add('temp-div')
    tempDiv.insertAdjacentHTML(
      'afterbegin',
      `
        <h1>Enter own value below</h1>
        <input type="text" id="text" name="text">
        <button data-id="3">GO!</button>
    `
    )
    this.buttonId.insertAdjacentElement('afterend', tempDiv)
    this.buttonId.remove()
    return tempDiv
  }
  eventHandler(items = this._list) {
    const arr = Array.prototype.slice.call(items)
    const its = this
    document.addEventListener('keypress', handlerHelper)

    function handlerHelper(event) {
      const key = event.key
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].innerHTML === key) {
          new Promise((resolve) => {
            setTimeout(() => {
              arr[i].classList.add('active')
              resolve()
            }, 100)
          })
            .then(() => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  arr[i].classList.remove('active')
                  resolve()
                }, 400)
              })
            })
            .then(() => {
              setTimeout(() => {
                arr[i].remove()
                const newArr = arr.map((i) => i.innerHTML)
                for (const [index, value] of newArr.entries()) {
                  if (arr[i].innerHTML === value) {
                    const str =
                      its.values[
                        Math.floor(Math.random() * (its.values.length - 1 + 1))
                      ]
                    newArr.splice(index, 1, str)
                    its.init(newArr.join(''))
                    document.removeEventListener('keypress', handlerHelper)
                    return
                  }
                }
              }, 200)
            })
        }
      }
    }
  }
  isGameOver(counter) {
    if (counter >= 20) {
      return true
    } else {
      return false
    }
  }
}
