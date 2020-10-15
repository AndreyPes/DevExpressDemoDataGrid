import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Service } from './datagridview/data-grid-view/data-grid-view.service';
import { DatagridColumnViewModel } from './datagridview/data-grid-view/dataGridViewModels/Datagrid.column.view.model';
import { State } from './datagridview/data-grid-view/dataGridViewModels/State.view.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})

export class AppComponent implements OnInit {
  columns: DatagridColumnViewModel[];
  dataSource: DataSource;
  allMode: string;
  checkBoxesMode: string;
  startEditAction: string = 'click';
  states: State[];

  title = 'm-app';

  constructor(private service: Service) {
  }

  ngOnInit(): void {

    this.columns = [{
      allowSearch: true,
      dataField: 'id',
      caption: 'Id',
      width: 70,
      allowEditing: false,
      dataType: 'number'
    },
    {
      //
      allowSearch: true,
      dataField: 'firstName',
      caption: 'First Name',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'lastName',
      caption: 'Last Name',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'combinedCandidateName',
      caption: 'Combined Candidate Name',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    }, 
    {
      //
      allowSearch: true,
      dataField: 'dateCreated',
      caption: 'Date Created',
      //
      width: null,
      allowEditing: true,
      dataType: 'date'
    },
    {
      //
      allowSearch: true,
      dataField: 'lastContact',
      caption: 'Last Contact Date',
      //
      width: null,
      allowEditing: true,
      dataType: 'date'
    },
    {
      //
      allowSearch: true,
      dataField: 'recruiter',
      caption: 'Recruiter',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'email',
      caption: 'Email',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'mobile',
      caption: 'Mobile',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'recrModus',
      caption: 'RecrModus',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'level',
      caption: 'Level',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'actualJobTitle',
      caption: 'Actual Job Title',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'actualCompany',
      caption: 'Actual Company',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    },
    {
      //
      allowSearch: true,
      dataField: 'notes',
      caption: 'Notes',
      //
      width: null,
      allowEditing: true,
      dataType: 'string'
    }];

    this.service.getCandidatesData().then((data) => {
      this.dataSource = new DataSource({
        store: data,
        paginate: true,
        pageSize: 5 });
    }).then(() => {
      this.allMode = 'allPages';
      this.checkBoxesMode = 'onClick';
    }).then(() => {
      this.service.getStates().then((data) => {
        this.states = data;
      });
    });

  }
}
