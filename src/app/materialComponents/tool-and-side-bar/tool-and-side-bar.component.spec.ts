import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolAndSideBarComponent } from './tool-and-side-bar.component';

describe('ToolAndSideBarComponent', () => {
  let component: ToolAndSideBarComponent;
  let fixture: ComponentFixture<ToolAndSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolAndSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolAndSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
