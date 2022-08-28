import { SpinnerService } from '../../core/services/spinner/spinner.service';

export class SpinnerConsumer {
  isBusy = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.visibility.subscribe((value: boolean) => {
      this.isBusy = value;
    });
  }
}
