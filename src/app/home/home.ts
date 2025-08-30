import { Component } from '@angular/core';
import { Header } from '../layout/header/header';
import { NewsVerifier } from '../pages/news-verifier/news-verifier';
import { VerifiedNews } from '../pages/verified-news/verified-news';
import { CardInstructions } from "../components/card-instructions/card-instructions";
import { Widget } from '../components/widget/widget';
import { AdsCard } from '../components/ads-card/ads-card';
import{ Footer } from '../layout/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, NewsVerifier, VerifiedNews, CardInstructions,AdsCard, Widget, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
