window.addEventListener('DOMContentLoaded', () => {

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };


  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  };

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.className == 'tabheader__item') {
      tabs.forEach((item, index) => {
        if (target == item) {
          target.classList.toggle('tabheader__item_active');
          hideTabContent();
          showTabContent(index);
        }
      });
    } else {
      target.classList.toggle('tabheader__item_active');
      hideTabContent();
      showTabContent(0);
    }
  });

  hideTabContent();
  showTabContent(0);

  //Timer

  const deadLine = '2020-10-24';

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  };

  const getZero = (num) => {
    if (num < 10 && num >= 0) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock('.timer', deadLine);

  //Modal

  const btn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('[data-close]');

  btn.forEach(item => {
    item.addEventListener('click', () => {
      showModal();
    });
  });

  modalClose.addEventListener('click', () => {
    closeModal();
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });


  // const modalTimerId = setTimeout(showModal, 15000);

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);


  //Class

  class MenuCart {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 28;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if(this.classes.length === 0){
        this.element = 'menu__item';
        element.classList.add(this.element);
      }else{
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}"</h3>
        <div class="menu__item-descr">
          ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    `;
      this.parent.append(element);
    }
  }

  new MenuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    ` Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей 
      и фруктов. Продукт активных и здоровых людей.
      Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    9,
    '.menu .container',
    'menu__item',
    'big',
  ).render();

  new MenuCart(
    "img/tabs/elite.jpg",
    "elite",
    `Меню “Премиум”`,
    ` В меню “Премиум” мы используем не только красивый дизайн упаковки,
    но и качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты - ресторанное меню без похода в ресторан!`,
    14,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCart(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    ` Меню “Постное” - это тщательный подбор ингредиентов: полное
    отсутствие продуктов животного происхождения, молоко из миндаля,
    овса, кокоса или гречки, правильное количество белков за счет тофу
    и импортных вегетарианских стейков.`,
    21,
    '.menu .container',
    'menu__item'
  ).render();

  //Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Loading',
    success: 'Thanks, we will contact you soon',
    failure: 'Something go wrong',
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'multipart/form-data');
      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener('load', () => {
        if(request.status === 200){
          console.log(request.response);
          statusMessage.textContent = message.success;
        }else{
          statusMessage.textContent = message.failure;
        }
      });
    });
  }

});