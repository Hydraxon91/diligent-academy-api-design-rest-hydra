export interface Movie {
    id: number;
    title: string;
    genres: string[];
    plot: string;
    releaseDate: string;
    actors?: ActorSummary[];
    _links: {
        self: string;
        actors: string;
    };
}

export interface MovieSummary {
    id: number;
    title: string;
}

export interface Actor {
    id: number;
    name: string;
    birthday: string;
    birthplace: string;
    height: number;
    movies?: MovieSummary[];
    _links: {
        self: string;
        movies: string;
    };
}

export interface ActorSummary {
    id: number;
    name: string;
}