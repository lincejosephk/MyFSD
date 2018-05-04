import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTableModule } from 'primeng/datatable';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { fakeBackendProvider, Interceptor } from '../../interceptor/interceptor';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { ViewTaskComponent } from './view-task.component';
import { ViewTaskService } from './view-task.service';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../utilities/common-service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: ViewTaskService;
  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [ViewTaskService, TaskService, ConfirmationService,DatePipe, {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
  });
  describe('ProjectManager - View Task test cases', () => {

    it('Test Case on project selected name is displayed in project textbox', () => { 
      component.assignProject("testProject",1);
     
      expect(component.selectedProject) 
          .toBe("testProject"); 
    });
    it('Test Case to get all task should return zero or more tasks', () => {
      component.getAllTask(1);
      expect(component.tasksList.length).toBeGreaterThanOrEqual(0);
    });
    it('Test Case on success  should return a message', () => { 
      component.showMessage(true,"Sucess!");
     
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(1); 
    });
    it('Test Case on init  project popup should have zero or more list items', () => {
      component.ngOnInit();
      expect(component.projectsList.length).toBeGreaterThanOrEqual(0);
    });
    it('Test Case on error  should return a message', () => { 
      component.showMessage(false,"Error occured!");
     
      expect(component.msgs.length) 
          .toBeGreaterThanOrEqual(1); 
    });

    
  });
});
