import { Component } from '@angular/core';
import { Header } from '../layout/header/header';
import { NewsVerifier } from '../pages/news-verifier/news-verifier';

@Component({
  selector: 'app-home',
  imports: [Header, NewsVerifier],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
