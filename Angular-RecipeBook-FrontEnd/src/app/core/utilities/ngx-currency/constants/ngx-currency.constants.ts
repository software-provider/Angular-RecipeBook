import { CurrencyMaskInputMode } from 'ngx-currency';

export const ngxCurrencyDefaultMaskOptions = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
  nullable: false,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL,
};
