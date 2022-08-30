import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
