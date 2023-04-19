import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  private readonly _defaultLimit: number = 20;
  private readonly _defaultTrail: string = '...';

  transform(value: string, args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0]) : this._defaultLimit;
    const trail = args.length > 1 ? args[1] : this._defaultTrail;

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
