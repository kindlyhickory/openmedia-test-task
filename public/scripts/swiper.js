const techSwiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination-current',
    clickable: true,
    bulletClass: 'technical-requirements__pagination-el',
    bulletActiveClass: 'technical-requirements__pagination-el_active',
    renderBullet: function (index, className) {
      return `<span class="${className}">${index === 0 ? 'Our servers' : 'Amazon Instance'}</span>`;
    },
  }
})

