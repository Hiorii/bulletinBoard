export const initialState = {
  categories: {
    data: [
      {
        id: '1',
        name: 'Praca',
        image: '/img/work.png',
      },
      {
        id: '2',
        name: 'Dom i ogród',
        image: '/img/home.png',
      },
      {
        id: '3',
        name: 'Elektronika',
        image: '/img/electronic.png',
      },
      {
        id: '4',
        name: 'Usługi',
        image: '/img/job.png',
      },
      {
        id: '5',
        name: 'Nieruchomości',
        image: '/img/sales.png',
      },
      {
        id: '6',
        name: 'Motoryzacja',
        image: '/img/car.png',
      },
    ],
  },
  posts: {
    data: [
      {
        id: '1',
        title: 'textTitle1',
        text: 'text1',
        image: '/img/logo.png',
        created: '2020.12.03',
        updated: '2020.12.06',
        email: 'Email1',
        status: 'published',
        price: 24,
        phone: 345876987,
        location: 'Warsaw',
        userId: '2',
      },
      {
        id: '2',
        title: 'textTitle2',
        text: 'text2',
        image: '/img/logo.png',
        created: '2020.11.29',
        updated: '2020.11.30',
        email: 'Email2',
        status: 'published',
        price: 28,
        phone: 521876987,
        location: 'Warsaw',
        userId: '4',
      },
      {
        id: '3',
        title: 'textTitle3',
        text: 'text3',
        image: '/img/logo.png',
        created: '2020.12.29',
        updated: '2020.12.30',
        email: 'Email3',
        status: 'published',
        price: 132,
        phone: 724876987,
        location: 'Krakow',
        userId: '4',

      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  users: [
    {
      id: '1',
      name: 'admin',
      surname: 'random surname',
      email: 'random email',
      role: 'admin',
      isLogged: true,
    },
    {
      id: '2',
      name: 'logged user1',
      surname: 'random surname',
      email: 'random email',
      role: 'logged',
      isLogged: true,
    },

    {
      id: '3',
      name: 'not logged user',
      surname: 'random surname',
      email: 'random email',
      role: 'not logged',
      isLogged: false,
    },
    {
      id: '4',
      name: 'logged user2',
      surname: 'random surname',
      email: 'random email',
      role: 'logged',
      isLogged: true,
    },
  ],
};
