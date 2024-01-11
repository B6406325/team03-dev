import { MoviesInterface } from "../fook";
import { UserInterface } from "../pool";

export interface ReviewInterface{
    ID?:number;
    ReviewText?: string;
	DateTime?: string;
    
    UserID?:number;
	User?:UserInterface;

	MovieID?:number;
	Movie?: MoviesInterface;

	RatingID?:number;
	Rating?:RatingInterface;

	GenreID?:number;
 	Genre?:GenreInterface;

}

export interface RatingInterface{
    ID?:number;
    RatingValue?: number;
}

export interface GenreInterface{
    ID?:number;
    Name?:string;

}