import { TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CardService } from './card.service';

describe('CardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CardService],
      imports: [
        FormsModule,
        HttpModule
      ],
    });
  });

  it('should ...', inject([CardService], (service: CardService) => {
    expect(service).toBeTruthy();
  }));
});
