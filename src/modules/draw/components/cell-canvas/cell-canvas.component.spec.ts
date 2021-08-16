import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCanvasComponent } from './cell-canvas.component';

describe('CellCanvasComponent', () => {
  let component: CellCanvasComponent;
  let fixture: ComponentFixture<CellCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
