import { Component, OnInit, Input } from '@angular/core';
import { LabelType, Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {
  @Input() minChoosenYear!: number;
  @Input() maxChoosenYear!: number;
  @Input() startYear!: number;
  @Input() endYear!: number;
  
  sliderOptions!: Options;
  minEventYear!: number;
  maxEventYear!: number;
  minEventMonth: number = 0;
  maxEventMonth: number = 0;
  
  // Массив месяцев
  months: string[] = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  
  // По умолчанию отображаем года
  view: string = 'years';

  month!: string
  year!: number

  constructor() {}

  ngOnInit(): void {
    this.minEventYear = this.minChoosenYear;
    this.maxEventYear = this.maxChoosenYear;

    // Опции слайдера
    this.sliderOptions = {
      floor: this.startYear,
      ceil: this.endYear,
      step: 1,
      showTicks: true,
      showTicksValues: true,
      showSelectionBar: true,
      tickStep: 1,
      tickValueStep: 1,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return `${this.getNameMonth(this.minEventMonth)} ` + value;
          case LabelType.High:
            return `${this.getNameMonth(this.maxEventMonth)} ` + value;
          default:
            return '' + value;
        }
      },
      ticksTooltip: (v: number): string => {
        console.log('Tooltip for ' + this.minEventMonth);
        return `Tooltip for ${v}`
      },
    };
  }

  // Функция для изменения представления слайдера
  public changeView(view: string) {
    this.view = view;
    if (this.view === 'years') {
      this.minChoosenYear = this.minEventYear;
      this.maxChoosenYear = this.maxEventYear
      // Отображаем года
      this.sliderOptions = {
        floor: this.startYear,
        ceil: this.endYear,
        step: 1,
        showTicks: true,
        showTicksValues: true,
        showSelectionBar: true,
        tickStep: 1,
        tickValueStep: 1,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return `${this.getNameMonth(this.minEventMonth)} ` + value;
            case LabelType.High:
              return `${this.getNameMonth(this.maxEventMonth)} ` + value;
            default:
              return '' + value;
          }
        },
        ticksTooltip: (v: number): string => {
          console.log('Tooltip for ' + this.minEventMonth);
          return `Tooltip for ${v}`
        },
      };
    } else if (this.view === 'months') {
      // Отображаем месяцы выбранных годов
      this.minChoosenYear = this.minEventMonth;
      this.maxChoosenYear = this.maxEventMonth;
      let yearStartIndex = this.minEventYear;
      let yearEndIndex = this.maxEventYear;
      let monthsToShow: string[] = [];
      for (let i = yearStartIndex; i <= yearEndIndex; i++) {
        monthsToShow = monthsToShow.concat(this.months);
      }
      this.sliderOptions = {
        floor: 0,
        ceil: monthsToShow.length - 1,
        step: 1,
        showTicks: true,
        showTicksValues: true,
        showSelectionBar: true,
        tickStep: 1,
        tickValueStep: 1,
        translate: (value: number) => monthsToShow[value],
        ticksTooltip: (v: number): string => {
          console.log('Tooltip for ' + this.minEventMonth);
          return `Tooltip for ${v}`
        },
      };
    }
  }

  // Функция для обработки изменения значений слайдера
  onSliderChange(event: any) {
    if (this.view === 'years'){
      this.minEventYear = event.value
      this.maxEventYear = event.highValue
    }
    else if (this.view === 'months') {
      this.minEventMonth = event.value
      this.maxEventMonth = event.highValue
    }
  }

  getNameMonth(value: number): string {
    let countIteration: number;
    if (value >= 12) {
      countIteration = Math.ceil(value / 12)
      let index = value - (12 * (countIteration - 1))
      return this.months[index]
    }
    else {
      let kek = this.months[value]
      return kek
    }
  }
}
