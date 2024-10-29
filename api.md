# API design

## Resources
    Movies: Stores information like title, genre, plot, release date and actors
    Actors: Name, birthdate, birth place and height

## URIs
    Movie: /movies/{id}
    All movies: /movies
    Movie Actors: /movies/{id}/actors
    Specific Actor in movie: /movies/{movieId}/actors/{actorId}
    Movie by Title: /movies?title={title}
    Movie by genre: /movies?genre={genre}
    

    Actor: /actors/{id}
    All actors: /actors
    Movies with actor: /actors/{id}/movies
    Actor by name: /actors?name={name}

## Resource 
    List of Movies / Item in a movie collection:
    ```json
    [
        {
            "id": 1,
            "title": "Inception",
            "releaseDate: "2010-07-16",
            "_links": [
                {"self": "/movies/1"}
            ]
        },
    ]
    ```
    Singular Movie:
    ```json
    {
        "id": 1,
        "title": "Inception",
        "genres": ["Action"],
        "plot": "Plot",
        "release-date": "2010-07-16",
        "actors": [ optional
            {
            "id": 1,
            "name": "Leonardo",
            "height": 183,
            "birthday": "1993-12-13",
            "birthplace": "Ohio",
            "link": "/actors/1"
            }
        ]
        "_links":{
            "self": "movies/1",
            "actors: "movies/1/actors"
        }
    }
    ```

    List of Actors / Item in an actor collection: 
    ```json
    [
        {
            "id": 1,
            "name": "Leonardo",
            "height": 183,
            "_links": [
                {"self": "/actors/1"}
            ]
        },
    ]
    ```

    ```
    Singular Actor:
    ```json
    {
        "id": 1,
        "name": "Leonardo",
        "birthday": "1993-12-13",
        "birthplace": "Ohio",
        "height": 183
        "movies": [ //optional
            {
            "id": 1,
            "title": "Inception",
            "genres": ["Action"],
            "plot": "Plot",
            "release-date": "2010-07-16",
            "link": "/movies/1"
            }
        ],
        "links": {
            "self": "/actors/1",
            "movies": "/actors/1/movies"
        }
    }
    ```

## Assigned HTTP methods
    Get Movie by ID: GET link.com/movies/{id}
    Get all movies: GET link.com/movies
    get movie actors: GET link.com/movies/{id}/actors
    Get specific actor in movie: GET link.com/movies/{movieId}/actors/{actorId}
    Get movie by title: GET link.com/movies?title={title}
    Get movies by genre: GET link.com/movies?genres={genres}
    Get by both: link.com/movies?title={title}&genres={genres}
    Create Movie: POST link.com/movies
    Update Movie: PUT link.com/movies/{id}
    Partially Update Movie: PATCH link.com/movies/{id}
    Remove Movie: DELETE link.com/movies/{id}
    Associate actor with movie: POST/PUT/PATCH link.com/movies/{id}/actors
    Remove/Dissociate actor from movie: DELETE link.com/movies/{movieId}/actors/{actorId}

    Get actor by ID: GET link.com/actors/{id}
    Get all actors: GET link.com/actors
    Get movies with actor: GET link.com/actors/{id}/movies
    Get actor by name: GET link.com/actors?name={name}
    Create Actor: POST link.com/
    Update Actor: PUT link.com/actors/{id}
    Partially Update Actor: PATCH link.com/actors/{id}
    Remove Actor: DELETE link.com/actors/{id}
    Add Movie to Actor: POST link.com/actors/{id}/movies
    Remove Movie from Actor: DELETE link.com/actors/{actorId}/movies/{movieId}
