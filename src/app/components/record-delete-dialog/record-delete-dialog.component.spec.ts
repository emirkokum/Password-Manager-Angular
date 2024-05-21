import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDeleteDialogComponent } from './record-delete-dialog.component';

describe('RecordDeleteDialogComponent', () => {
  let component: RecordDeleteDialogComponent;
  let fixture: ComponentFixture<RecordDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
