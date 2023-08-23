export type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  key: string | undefined;
};

export interface MovieDetail extends Movie {
  genres: Genres[];
  runtime: number;
  tagline: string;
}

export type Genres = {
  id: number;
  name: string;
};

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

interface DateTicket {
  date: number;
  day: string;
}

export type Ticket = {
  seatArray: number[];
  time: string;
  date: DateTicket;
  ticketImage: string;
};
