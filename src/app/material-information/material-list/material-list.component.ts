import {
  Component, Inject, OnInit,
  ElementRef, ViewChild
}                                                                 from '@angular/core';
import * as echarts                                               from 'echarts';
import {FormBuilder, FormGroup}                                                                    from '@angular/forms';
import {UtilService}                                                                               from '../../shared/common/util.service';
import {PAGE_PARAM_INIT}                                                                           from '../../shared/models/page-params-init';
import {NzMessageService, NzModalService}                                                          from 'ng-zorro-antd';
import {MaterialInfoModel, MaterialQueryParamsModel, LineOptions} from "../material-models/material-model";
import {MaterialService} from "../material-services/material-service";

import EChartOption = echarts.EChartOption;
//import {DatePipe} from "@angular/common";

@Component({
  selector: 'wms-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {


  materialSearchGroup: FormGroup;

  materialList: Array<MaterialInfoModel> = [];

  _loading = false;//请求表格数据时是否显示loading

  //构建搜索form
  createSearchForm() {
    this.materialSearchGroup = this.fb.group({
      materialName: '',
      supplierName: ''
    });
  }

  //点击查询
  _search(flag) {
    this.queryMaterialList(flag);
  }

  //获取所有物资列表
  queryMaterialList(flag?) {
    if (flag === 'search' && !flag) {
      this.pageParam.currentPage = 1;
    }
    this._loading = true;
    const _params = Object.assign({}, this.pageParam, this.materialSearchGroup.value);
    let _finalParams: MaterialQueryParamsModel = {};
    for (let [key, value] of Object.entries(_params)) {
      if (key !== 'totalCount') {
        _finalParams[key] = value;
      }
    }

    this.ms.getMaterialList(_finalParams).subscribe(
        (data) => {
          this.pageParam.totalCount = data.totalCount;
          this.materialList = data.resultList;
          this._loading = false;
        },
        (error) => {
          this._loading = false;
          this.nzMessage.error(error.message);
        }
    )
  }


  //打开折线图模态框
  lineChatModal: boolean = false;


  closeLineChartModal() {
    this.lineChatModal = false;
  }

  commonTime:string;
  openLineChartModal(dataParam) {
      this.lineChatModal = true;
      let timeLists=[];
      timeLists=dataParam.timeList;
      if(timeLists.length>6){
        timeLists = timeLists.slice(-6);
      }
      if(typeof timeLists[0] == 'number'){
        for(let i=0;i<timeLists.length;i++){
          let unixTimestamp = new Date(timeLists[i]) ;
          this.commonTime = unixTimestamp.toLocaleString();
         // console.log(this.commonTime);
          this.commonTime=this.commonTime.substring(0,9);
          timeLists.splice(i,1,this.commonTime);
        }
      }
      setTimeout(() => {
        this.renderContentChart(dataParam.priceList,timeLists);
      })
  }

  //构建折线图方法
  renderContentChart(dataPrice,dataTime){
    let _div = this.el.nativeElement.querySelector('.materialChart');
    echarts.dispose(_div);

    let _lineOptions: LineOptions  = {
      title:'价格折线图',
      xAxis:dataTime,
      series:dataPrice
    }
    echarts.init(_div).setOption(this.createLineOptions(_lineOptions))
  }

  createLineOptions(option: LineOptions): EChartOption {
    return {
      title: {
        text: option.title,
        left: 'left',
        textStyle: {
          fontSize: 14
        }
      },
      xAxis:{
        type:'category',
        name:"日期（年/月/日）",
        minInterval:1,
        splitNumber:7,
        data:option.xAxis,
        axisLine:{
          symbol:['none', 'arrow'],
          symbolSize:[5,5]
        },
        axisTick:{
          show:false
        }
      },
      yAxis:{
        type:'value',
        name:"价格（元）"
      },
      series: [
        {
          data:option.series,
          type:'line'
        }
      ]
    }
  }


  constructor(private fb: FormBuilder,
              private util: UtilService,
              private ms: MaterialService,
              @Inject('PAGE_PARAM_INIT') public pageParam,
              private nzModal: NzModalService,
              private nzMessage: NzMessageService,
              //private datePipe: DatePipe,
  private el: ElementRef) {

    this.pageParam = Object.assign({}, this.pageParam);
  }

  ngOnInit() {
    this.createSearchForm();
    this.queryMaterialList();
  }
}
