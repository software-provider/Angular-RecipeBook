import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator',
})
export class ThousandSeparatorPipe implements PipeTransform {
  private readonly _defaultSeparator: string = '.';
  private readonly _defaultDecimalSeparator = ',';
  private readonly _thousandSeparatedRegExp: RegExp = /(\d+)(\d{3})/;

  transform(value: number, args: any[]): string {
    const valueStr: string = this.replaceDecimalPointToComma(value);

    const thousandSeparator: string = args.length > 0 ? args[0] : this._defaultSeparator;
    const decimalSeparator: string = args.length > 1 ? args[1] : this._defaultDecimalSeparator;
    const splittedValue: string[] = String(valueStr).split(`${decimalSeparator}`);

    let integerValue: string = splittedValue[0];
    let remainderValue: string = splittedValue[1];

    while (this._thousandSeparatedRegExp.test(integerValue)) {
      integerValue = integerValue.replace(this._thousandSeparatedRegExp, `$1${thousandSeparator}$2`);
    }

    return `${integerValue}${remainderValue ? `${decimalSeparator}${remainderValue}` : ``}`;
  }

  private replaceDecimalPointToComma(value: number): string {
    const regExp: RegExp = /\./g;

    return String(value).replace(regExp, this._defaultDecimalSeparator);
  }
}
