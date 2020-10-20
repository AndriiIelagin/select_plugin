const INPUT = 'input'
const ITEM = 'item'
const BACKDROP = 'backdrop'

const getTemplate = (data, placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder by default'

  const items = data.map(item => {
    let cls = ''
    if(item.id == selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `
  })
  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="fas fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId
    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.#render()
    this.#setup()
  }

  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.remove('fa-chevron-up')
    this.$arrow.classList.add('fa-chevron-down')
  }

  #render() {
    const {placeholder, data} = this.options

    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  #setup() {
    this.clickHanlder = this.clickHanlder.bind(this)
    this.$el.addEventListener('click', this.clickHanlder)
    this.$arrow = document.querySelector('[data-type="arrow"]')
    this.$value = document.querySelector('[data-type="value"]')
  }

  clickHanlder(event) {
    const {type} = event.target.dataset
    if(type === INPUT) {
      this.toggle()
    } else if(type === ITEM) {
      const id = event.target.dataset.id
      this.select(id)
    } else if(type === BACKDROP) {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find(item => item.id == this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value

    this.$el.querySelectorAll('[data-type="item"]').forEach(item => {
      item.classList.remove("selected")
    });
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHanlder)
    this.$el.innerHTML = ''
  }
}