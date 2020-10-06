import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChemicalService } from '../../../core/chemical-service/chemical.service';
import { NotificationService } from '../../../core/notification-service/notification.service';

@Component({
  selector: 'pelaguru-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss'],
})
export class AddPlantComponent implements OnInit {
  constructor(
    private chemicalService: ChemicalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}
  addPlant() {}
}
