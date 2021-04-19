const scrollBtn = document.querySelector('.arrow')
const favoriteBox = document.querySelector('.city_list')

scrollBtn.addEventListener('click', () => {
  favoriteBox.scrollTo(1000,0)
})