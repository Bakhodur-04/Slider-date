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
  sliderCommonOptions!: Options;

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

  ngOnInit(): void {
    this.minEventYear = this.minChoosenYear;
    this.maxEventYear = this.maxChoosenYear;

    // Опции слайдера
    this.sliderCommonOptions = {
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
      ticksTooltip: (v: number): string =>  `${v} год`,
    };

    this.sliderOptions = this.sliderCommonOptions;
  }

  // Функция для изменения представления слайдера
  public changeView(view: string) {
    this.view = view;
    if (this.view === 'years') {
      this.minChoosenYear = this.minEventYear;
      this.maxChoosenYear = this.maxEventYear
      // Отображаем года
      this.sliderOptions = {
        ...this.sliderCommonOptions,
      };
    } else {
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
        ...this.sliderCommonOptions,
        floor: 0,
        ceil: monthsToShow.length - 1,
        translate: (value: number) => `${monthsToShow[value]} ${this.getСycleYearArray()[value]}`,
        ticksTooltip: (v: number): string => `${this.getNameMonth(v)} ${this.getСycleYearArray()[v]} год`,
      };
    }
  }

  // Функция для обработки изменения значений слайдера
  onSliderChange(event: any) {
    if (this.view === 'years'){
      this.minEventYear = event.value
      this.maxEventYear = event.highValue
    }
    else {
      this.minEventMonth = event.value
      this.maxEventMonth = event.highValue
    }
  }

  // Функция для конвертирования значения в название месяца
  getNameMonth(value: number): string {
    if (value < 12) {
      return this.months[value]
    }
    else {
      let countIteration: number = Math.ceil(value / 12)
      let index = value - (12 * (countIteration - 1))
      return this.months[index]
    }
  }

  getСycleYearArray(): Array<string> {
    let currentYear: number = this.minEventYear
    const endYear: number = this.maxEventYear
    const monthCount: number = 12;
    const yearsArray: Array<string> = [];
    for (let i = currentYear; i <= endYear; i++) {
      for (let j=0; j < monthCount; j++) {
        yearsArray.push(String(currentYear))
      }
      currentYear += 1
    }
    return yearsArray
  }
}
