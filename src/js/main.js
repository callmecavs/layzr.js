import Layzr from './layzr'

const main = () => {
  const instance = Layzr()

  instance
    .update()
    .handlers(true)
}

document.addEventListener('DOMContentLoaded', event => main())
