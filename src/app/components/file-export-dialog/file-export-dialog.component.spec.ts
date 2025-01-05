import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExportDialogComponent } from './file-export-dialog.component';

describe('FileExportDialogComponent', () => {
  let component: FileExportDialogComponent;
  let fixture: ComponentFixture<FileExportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileExportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
