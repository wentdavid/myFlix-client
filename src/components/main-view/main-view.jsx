import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Tenet',
      Description: 'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      Genre: {
      Name: 'Science-Fiction',
      Description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena th at are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issue s like the human condition.'
      },
      Director: {
            Name:'Christopher Nolan',
            Bio: 'Christopher Nolan[1] CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honou rs throughout his career for his works; in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was a pointed Commander of the Order of the British Empire for his services to film.',
            Birth: '1970',
            Death:'-'
        },
      ImagePath: 'https://media.senscritique.com/media/000019525188/source_big/Tenet.jpg',
      Featured: false
    },

    {
        id: 2,
        Title: 'Catch Me If You Can',
        Description: 'Catch Me If You Can is a 2002 American biographical crime comedy-drama[3] film directed and produced by Steven Spielber g and starring Leonardo DiCaprio and Tom Hanks with Christopher Walken, Martin Sheen, Nathalie Baye, Amy Adams and James Brolin in suppor ting roles. The screenplay by Jeff Nathanson is based on the autobiography of Frank Abagnale, who claims that before his 19th birthday, h e successfully performed cons worth millions of dollars by posing as a Pan American World Airways pilot, a Georgia doctor, and a Louisian a parish prosecutor. The truth of his story is questionable',
        Genre: {
        Name: 'Drama',
        Description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena th at are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issue s like the human condition.'
        },
        Director: {
              Name:'Christopher Nolan',
              Bio: 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. [1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre, [2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen d rama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurr ence of conflict-emotional, social, or otherwise-and its resolution in the course of the storyline.',
              Birth: '1970',
              Death:'-'
          },
        ImagePath:'http://cafmp.com/wp-content/uploads/2013/01/Catch-Me-If-You-Can.jpg',
        Featured: false
      },

      {
        id: 3,
        Title: 'Minority Report',
        Description: 'John Anderton is a top Precrime cop in the late-21st century, when technology can predict crimes before theyre committed. But Anderton becomes the quarry when another investigator targets him for a murder charge.',
        Genre: {
        Name: 'Science-Fiction',
        Description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena th at are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issue s like the human condition.'
        },
        Director: {
              Name:'Christopher Nolan',
              Bio: 'Christopher Nolan[1] CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honou rs throughout his career for his works; in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was a pointed Commander of the Order of the British Empire for his services to film.',
              Birth: '1970',
              Death:'-'
          },
        ImagePath: 'https: //www.regarder-films.net/w-content/uploads/2019/12/minority-report.jpg',
        Featured: false
      },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return ( 
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
        key={movie.id} 
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
         }}
        />
      ))}
    </div>
  );
};