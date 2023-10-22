import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IMovie } from '../movie';
import { HttpClient } from '@angular/common/http';
import { IGenre,ICreateMovieDto } from '../movie';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  findInfo?: FormControl;
  movieForm: FormGroup;
  movies:IMovie[]=[];
  genres!: IGenre[];
  
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) {

     this.http.get<IMovie[]>('https://localhost:7078/api/movies').subscribe(res=>{
      console.log(res);
      this.movies=res;
      
    });
    this.http.get<IGenre[]>('https://localhost:7078/api/movies/genres').subscribe(res=>{
      console.log(res);
      this.genres=res;
      //this.genres=this.movie?.genres?.map((g)=>g.name);
    });


    this.movieForm = this.fb?.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      year: [new Date().getFullYear(), Validators.max(new Date().getFullYear())],
      imageUrl: "",
      description: "",
      duration: '01:30',
      genreIds: [[]]
    });
  }

  ngOnInit(): void {

    this.findInfo = new FormControl("find");
    //create form with FormBuilder
  }


  addMovie() {
    let item = this.movieForm.value as ICreateMovieDto;
    item.duration += ":00";
    console.log(item);

    this.http.post('https://localhost:7078/api/movies/create', item)
    .subscribe(res => 
    {
      console.log("Creating success!!!!!");
      this.router.navigate(['movies']);
    });
    // item.id = this.movies.length + 1;
    // this.movies.push(item);  //add to local collection

  }
  // addMovieWithParam(formFull: FormGroupDirective) {
  //   let item = this.movieForm.value;
  //   console.log(item);
  //   console.log(formFull.valid);
  //   console.log(formFull.value.year);
  //   console.log(formFull.value.genres);
  // }
  printInfo() {
    console.log(this.findInfo?.value);
  }
}
