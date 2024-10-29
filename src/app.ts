import fastify from 'fastify';
import { Movie, Actor, MovieSummary, ActorSummary } from './types/schemas';

export default function createApp(options = {}) {
  const app = fastify(options);

  let movies: Movie[] = [
    {
      id: 1,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      genres: ['Adventure', 'Fantasy'],
      plot: 'A young hobbit, Frodo Baggins, embarks on a journey to destroy a powerful ring.',
      releaseDate: '2001-12-19',
      actors: [
        { id: 1, name: 'Elijah Wood' },
        { id: 2, name: 'Ian McKellen' },
        { id: 3, name: 'Viggo Mortensen' },
      ],
      _links: {
        self: '/movies/1',
        actors: '/movies/1/actors',
      },
    },
    {
      id: 2,
      title: 'The Lord of the Rings: The Two Towers',
      genres: ['Adventure', 'Fantasy'],
      plot: 'Frodo and Sam continue their journey to Mordor while Aragorn, Legolas, and Gimli pursue the kidnapped Merry and Pippin.',
      releaseDate: '2002-12-18',
      actors: [
        { id: 1, name: 'Elijah Wood' },
        { id: 2, name: 'Ian McKellen' },
        { id: 4, name: 'Sean Astin' },
      ],
      _links: {
        self: '/movies/2',
        actors: '/movies/2/actors',
      },
    },
    {
      id: 3,
      title: 'The Lord of the Rings: The Return of the King',
      genres: ['Adventure', 'Fantasy'],
      plot: 'The hobbits continue their quest to destroy the One Ring while the forces of good and evil clash in a final battle.',
      releaseDate: '2003-12-17',
      actors: [
        { id: 1, name: 'Elijah Wood' },
        { id: 2, name: 'Ian McKellen' },
        { id: 5, name: 'Andy Serkis' },
      ],
      _links: {
        self: '/movies/3',
        actors: '/movies/3/actors',
      },
    },
  ];
  
  let actors: Actor[] = [
    {
      id: 1,
      name: 'Elijah Wood',
      birthday: '1981-01-28',
      birthplace: 'Cedar Rapids, Iowa, USA',
      height: 175,
      movies: [
        { id: 1, title: 'The Lord of the Rings: The Fellowship of the Ring' },
        { id: 2, title: 'The Lord of the Rings: The Two Towers' },
        { id: 3, title: 'The Lord of the Rings: The Return of the King' },
      ],
      _links: {
        self: '/actors/1',
        movies: '/actors/1/movies',
      },
    },
    {
      id: 2,
      name: 'Ian McKellen',
      birthday: '1939-05-25',
      birthplace: 'Burnley, Lancashire, England',
      height: 178,
      movies: [
        { id: 1, title: 'The Lord of the Rings: The Fellowship of the Ring' },
        { id: 2, title: 'The Lord of the Rings: The Two Towers' },
        { id: 3, title: 'The Lord of the Rings: The Return of the King' },
      ],
      _links: {
        self: '/actors/2',
        movies: '/actors/2/movies',
      },
    },
    {
      id: 3,
      name: 'Viggo Mortensen',
      birthday: '1958-10-20',
      birthplace: 'Manhattan, New York City, New York, USA',
      height: 180,
      movies: [
        { id: 1, title: 'The Lord of the Rings: The Fellowship of the Ring' },
      ],
      _links: {
        self: '/actors/3',
        movies: '/actors/3/movies',
      },
    },
    {
      id: 4,
      name: 'Sean Astin',
      birthday: '1971-02-25',
      birthplace: 'Santa Monica, California, USA',
      height: 175,
      movies: [
        { id: 2, title: 'The Lord of the Rings: The Two Towers' },
        { id: 3, title: 'The Lord of the Rings: The Return of the King' },
      ],
      _links: {
        self: '/actors/4',
        movies: '/actors/4/movies',
      },
    },
    {
      id: 5,
      name: 'Andy Serkis',
      birthday: '1973-04-20',
      birthplace: 'Hounslow, London, England',
      height: 170,
      movies: [
        { id: 3, title: 'The Lord of the Rings: The Return of the King' },
      ],
      _links: {
        self: '/actors/5',
        movies: '/actors/5/movies',
      },
    },
  ];

  app.get('/movies', async (request, reply) => {
    const movieSummaries: MovieSummary[] = movies.map(movie => ({
      id: movie.id,
      title: movie.title,
    }));
    return movieSummaries;
  });

  app.post('/movies', async (request, reply) => {
    const newMovie: Movie = request.body as Movie;

    if (!newMovie.title || !newMovie.releaseDate || !Array.isArray(newMovie.genres)) {
      return reply.status(400);
    }

    const newId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;

    const movieToAdd: Movie = {
      ...newMovie,
      id: newId,
      _links: {
        self: `/movies/${newId}`,
        actors: `/movies/${newId}/actors`,
      },
    };

    movies.push(movieToAdd);

    return reply.status(201).send(movieToAdd);
  })

  app.get('/movies/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const movie = movies.find(m => m.id === parseInt(id));

    if (!movie) {
      return reply.status(404).send({ message: 'Movie not found' });
    }
    return movie;
  });

  app.get('/actors', async (request, reply) => {
    const actorSummaries: ActorSummary[] = actors.map(actor => ({
      id: actor.id,
      name: actor.name,
    }));
    return actorSummaries;
  });

  app.get('/actors/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const actor = actors.find(a => a.id === parseInt(id));

    if (!actor) {
      return reply.status(404).send({ message: 'Actor not found' });
    }
    return actor;
  });

  app.get('/hello', async () => {
    return { hello: 'World!' };
  });

  return app;
}
