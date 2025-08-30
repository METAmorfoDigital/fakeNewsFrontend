import { Component,OnInit ,NgZone ,OnDestroy, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';


// --- INTERFACES PARA TYPESCRIPT ---
interface WeatherCondition {
    text: string;
    icon: string;
    code: number;
}

interface CurrentWeather {
    temp_c: number;
    condition: WeatherCondition;
    is_day: number; // 0 para noche, 1 para día
}

interface Location {
    name: string;
    country: string;
}

interface WeatherAPIResponse {
    location: Location;
    current: CurrentWeather;
}

@Component({
  selector: 'app-widget',
  imports: [CommonModule],
  templateUrl: './widget.html',
  styleUrl: './widget.scss'
})
export class Widget implements OnInit, OnDestroy {
    // --- ESTADO DEL COMPONENTE ---
    location: string = '--';
    date: string = '--';
    timeMain: string = '--:--';
    timeSeconds: string = '--';
    temperature: string = '--&deg;';
    description: string = 'Cargando...';
    weatherIconHTML: string = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h5M5.52 15.52a9 9 0 0012.96 0M20 20v-5h-5M18.48 8.48a9 9 0 00-12.96 0" />
        </svg>`;
    widgetClass: string = 'bg-default';

    // --- CONFIGURACIÓN Y CONSTANTES ---
    private readonly apiKey = '4380d460606c4688a6a191626253008';
    private readonly defaultCity = 'Cochabamba';
    private timerInterval: any;

    private readonly weatherConditions: { [key: number]: string } = {
        1000: 'bg-sunny', 1003: 'bg-cloudy', 1006: 'bg-cloudy', 1009: 'bg-cloudy',
        1063: 'bg-rainy', 1180: 'bg-rainy', 1183: 'bg-rainy', 1186: 'bg-rainy',
        1189: 'bg-rainy', 1192: 'bg-rainy', 1195: 'bg-rainy', 1066: 'bg-snowy',
        1210: 'bg-snowy', 1213: 'bg-snowy', 1216: 'bg-snowy', 1219: 'bg-snowy',
        1222: 'bg-snowy', 1225: 'bg-snowy'
    };
    
    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.updateDateTime(); // Llamada inicial para que no se vea vacío
        this.timerInterval = setInterval(() => {
            this.updateDateTime();
        }, 1000);

        if (!this.apiKey) {
            this.displayError('API Key no configurada.');
            return;
        }

        this.getLocationAndFetchWeather();
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    private updateDateTime(): void {
        const now = new Date();
        this.date = new Intl.DateTimeFormat('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }).format(now);
        this.timeMain = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        this.timeSeconds = String(now.getSeconds()).padStart(2, '0');
        this.cdr.detectChanges(); // Forzar la actualización de la vista
    }

    private getLocationAndFetchWeather(): void {
        const success = (pos: GeolocationPosition): void => {
            const { latitude, longitude } = pos.coords;
            this.fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${latitude},${longitude}&lang=es`);
        };

        const error = (): void => {
            this.fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.defaultCity}&lang=es`);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            error();
        }
    }

    private async fetchWeather(url: string): Promise<void> {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('No se pudo cargar el clima.');
            const data: WeatherAPIResponse = await response.json();
            this.updateWeatherUI(data);
        } catch (error) {
            console.error('Error al obtener datos del clima:', error);
            if (error instanceof Error) {
                this.displayError(error.message);
            } else {
                this.displayError('Ocurrió un error desconocido.');
            }
        }
    }

    private updateWeatherUI(data: WeatherAPIResponse): void {
        const { location, current } = data;
        this.location = `${location.name}, ${location.country}`;
        this.temperature = `${Math.round(current.temp_c)}&deg;`;
        this.description = current.condition.text;
        this.weatherIconHTML = `<img src="${current.condition.icon.replace('64x64', '128x128')}" alt="icono clima">`;

        let newClass = current.is_day === 0 ? 'bg-night' : this.weatherConditions[current.condition.code] || 'bg-default';
        this.widgetClass = newClass;
        this.cdr.detectChanges(); // Forzar la actualización de la vista
    }

    private displayError(message: string): void {
        this.location = 'Error';
        this.description = message;
        this.weatherIconHTML = '<span style="font-size: 2rem;">⚠️</span>';
        this.temperature = '--&deg;';
        this.widgetClass = 'bg-default';
        this.cdr.detectChanges(); // Forzar la actualización de la vista
    }
}