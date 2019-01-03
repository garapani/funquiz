import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareQuizComponent } from './share-quiz.component';

describe('ShareQuizComponent', () => {
  let component: ShareQuizComponent;
  let fixture: ComponentFixture<ShareQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
