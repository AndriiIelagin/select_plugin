import {Select} from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
  placeholder: 'Please, select an item',
  selectedId: '5',
  data: [
    {id: 1, value: 'React'},
    {id: 2, value: 'Angular'},
    {id: 3, value: 'Vue'},
    {id: 4, value: 'Next'},
    {id: 5, value: 'Express'},
  ],
  onSelect(item) {
    console.log('Selected Item: ', item)
  }
})

window.s = select