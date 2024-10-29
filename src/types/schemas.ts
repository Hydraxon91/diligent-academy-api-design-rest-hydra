export interface Movie {
    id: number;
    title: string;
    genres: string[];
    plot: string;
    releaseDate: string;
    actors?: Actor[];
    _links: {
        self: string;
        actors: string;
    };
}

export interface Actor {
    id: number;
    name: string;
    birthday: string;
    birthplace: string;
    height: number;
    movies?: Movie[];
    _links: {
        self: string;
        movies: string;
    };
}