import { Candidate } from './dataGridViewModels/Candidate.view.model';
import { Component, Input, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { State } from './dataGridViewModels/State.view.model';
import { ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelProper from "exceljs";
import saveAs from 'file-saver';
import { Service } from './data-grid-view.service';
import { DatagridColumnViewModel } from './dataGridViewModels/Datagrid.column.view.model';

@Component({
    selector: 'DataGridViewComponent',
    templateUrl: './data-grid-view.html',
    styleUrls: ['./data-grid-view.css'],
    providers: [Service]
})

export class DataGridViewComponent implements OnInit {
    //dataSource: any = {};
    
    //startEditAction: string = "click";
    @ViewChild('testDataGrid', { static: false }) testDataGrid: DxDataGridComponent;
    @ViewChild('searchPanel', { static: false }) searchPanel: DxDataGridComponent;
    @Input('DataGridColumns') columns: DatagridColumnViewModel[];
    @Input('DataGridDataSource') dataSource: DataSource;
    @Input('SelectTextOnEditStart') selectTextOnEditStart: boolean = true;
    @Input('States') states: State[];
    @Input('AllMode') allMode: string;
    @Input('CheckBoxesMode') checkBoxesMode: string;
    @Input('StartEditAction') startEditAction: string = "click";
    //constructor, set service to this component
    constructor(private service: Service) {
    }

    //on component init
    ngOnInit() {
      //this.dataSource.loadOptions({totalCount:10})
    //   this.dataGrid.instance.filter([
    //     [ "Cost", ">", 1000 ],
    //     "and",
    //     [ "Cost", "<=", 2000 ]
        // this.service.getCandidatesData().then((data)=>{
        //   this.dataSource = new DataSource({
        //     store: data,
        //     paginate: true,
        //     pageSize: 5,
        //   })
        // }).then(()=>{
        //   this.allMode = 'allPages';
        //   this.checkBoxesMode = 'onClick'
        // }).then(()=>{
        //   this.service.getStates().then((data)=>{
        //     this.states = data;
        //   })
        // });
 
        // console.log('look at me');
        // console.log(this.columns);
        // this.dataSource
        // this.columns.push( new DevExpress.ui.dxDataGridColumn)
        // this.testDataGrid.columns();
    }

    //Track events
    logEvent(e) {
      console.log(e);
    }

    //Track input in search field
    onOptionChanged(e) {
      console.log(e.name);
      // filter array
      console.log('filter array');
      console.log(this.testDataGrid.filterValue);
      
      switch(e.name) {
        case "searchPanel":
          this.serchGrid(e.value);
            break;
        case "filterValue":
          console.log(e);
          console.log('SearchFilter');    
        default:
          console.log('default statment');
      }
    }

    //insert new row: TODO: handle exception from server and status code
    insertRow(e) {
      this.service.addCandidate(Object.assign(new Candidate(), e.data)).then((response)=>{
        this.refresh();
      });
    }

    //Delete data. TODO: handle exception from server and status code
    deleteRow(e) {
      this.service.deleteCandidate(e.key.id).then((response)=>{
        this.refresh();
      });
    }

    //Update datagrid data. TODO: should be using with filter object
    refresh() {
      this.service.getCandidatesData().then((data)=>{
        this.dataSource = new DataSource({
          store: data,
          paginate: true,
          pageSize: 5,
        });
      });
    }

    //search method. TODO: handle exception from server and status code
    rowUpdate(e) {
      let currentRowData = Object.assign(new Candidate(), e.oldData);
      currentRowData = Object.assign(currentRowData, e.newData);

      this.service.editCandidate(currentRowData).then((response)=>{
        this.refresh();
      });
    }

    //search method. TODO: should be using with filter object plus handle exceptions from server side and status code
    serchGrid(text: string)
    {
        this.service.getCandidatesData(text).then((data)=>{
          this.dataSource = new DataSource({
            store: data,
            paginate: true,
            pageSize: 5,
          })
        }).then(()=>{
        this.allMode = 'allPages';
        this.checkBoxesMode = 'onClick'
      });
    }

    //Excel export. TODO: have to fix issue with reverse data after export to .csv or .xlsx fromat
    //For export data you shoul marked as selected some rows, selected rows will be exported...
    exportGrids(e, docType) {
        const context = this;
        const workbook = new ExcelProper.Workbook();
        const priceSheet = workbook.addWorksheet('Candidates');
    
        priceSheet.getRow(2).getCell(2).value = 'Report';
        priceSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
      
        function setAlternatingRowsBackground(gridCell, excelCell) {
          if(gridCell.rowType === 'header' || gridCell.rowType === 'data') {
            if(excelCell.fullAddress.row % 2 === 0) {
              excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' }};
            }
          }
        }
      
        exportDataGrid({
          worksheet: priceSheet,
          component: context.testDataGrid.instance,
          selectedRowsOnly: true,
          topLeftCell: docType === 'xlsx' ?  { row: 4, column: 2 } : null,
          customizeCell: (options) => {
            setAlternatingRowsBackground(options.gridCell, options.excelCell)
          }}).then(() => {   
            let fileExtension;
            let formattedWorkcBook;

            if(docType === 'xlsx'){
              fileExtension = '.xlsx'
              formattedWorkcBook = workbook.xlsx;
            }
            if(docType === 'csv'){
              fileExtension = '.csv'
              formattedWorkcBook = workbook.csv;
            }
          
            formattedWorkcBook.writeBuffer().then((buffer) => {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CandidatesReport' + fileExtension);
            });
            
          })
        }
      }