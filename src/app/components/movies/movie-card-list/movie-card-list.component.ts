import { Component, OnInit } from '@angular/core';
import { IGenre, IMovie } from '../movie';
import { MOVIES } from '../movies-mock-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.css']
})

export class MovieCardListComponent implements OnInit {
  movies:IMovie[]=[];
  genres:IGenre[]=[];
  constructor(private http: HttpClient){

    this.http.get<IMovie[]>('https://localhost:7078/api/movies').subscribe(res=>{
      console.log(res);
      this.movies=res;
      
    });
    
  }
  ngOnInit(): void {
  }

}
