import {Component, ElementRef, OnInit, ViewChild}                 from '@angular/core';
import * as echarts                                               from 'echarts';
import {HomeServiceService}                                       from '../services/home-service.service';
import {AssetRatio, AssetStatusRatio, InventoryRatio, PieOptions} from '../models/home-model';
import {NzMessageService}                                         from 'ng-zorro-antd';
import EChartOption = echarts.EChartOption;

@Component({
  selector: 'wms-home-chart',
  templateUrl: './home-chart.component.html',
  styleUrls: ['./home-chart.component.scss']
})
export class HomeChartComponent implements OnInit {

  @ViewChild('left') left: ElementRef;

  getAssetRatio() {
    this.hs.getAssetRatio().subscribe(
      (data) => {
        this.renderLeftChart(data.assetsStatusRatios);
        this.renderRightChart(data.inventoryRatios)
      },
      (error) => {
        this.nzMessage.error(error.message);
      }
    );
  }

  renderLeftChart(data: AssetStatusRatio): void {
    if(!data) return;

    echarts.dispose(this.left.nativeElement);

    let _pieOptions: PieOptions  = {
        title: '固定资产状态统计',
        legend: ['在用', '闲置', '借出', '报修', '报废'],
        series: [
          {
            name: '在用',
            value: data.usingRatio
          },
          {
            name: '闲置',
            value: data.idleRatio
          },
          {
            name: '借出',
            value: data.borrowRatio
          },
          {
            name: '报修',
            value: data.repaireRatio
          },
          {
            name: '报废',
            value: data.scrapRatio
          },
        ]
    };
    echarts.init(this.left.nativeElement).setOption(this.createPieOptions(_pieOptions))
  }

  renderRightChart(data: InventoryRatio): void {
    if(!data) return;

    let _div = this.el.nativeElement.querySelector('.right');
    echarts.dispose(_div);

    let _pieOptions: PieOptions  = {
      title: 'SU/IOM库存状态统计',
      legend: ['SU库存', 'IOM库存', 'SU出库', 'IOM出库'],
      series: [
        {
          name: 'SU库存',
          value: data.suinventoryRatio ? data.suinventoryRatio : 0
        },
        {
          name: 'IOM库存',
          value: data.iominventoryRatio ? data.iominventoryRatio : 0
        },
        {
          name: 'SU出库',
          value: data.suoutRatio ? data.suoutRatio : 0
        },
        {
          name: 'IOM出库',
          value: data.iomoutRatio ? data.iomoutRatio: 0
        },
      ]
    };
    echarts.init(_div).setOption(this.createPieOptions(_pieOptions))
  }

  createPieOptions(option: PieOptions): EChartOption {
    return {
      title: {
        text: option.title,
        left: 'center',
        textStyle: {
          fontSize: 14
        }
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: option.legend
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          data: option.series,
          label: {
            show: true,
            formatter: '{d}%',
            color: '#fff',
            position: 'inside'
          },
          hoverAnimation: false
        }
      ]
    }
  }

  constructor(private hs: HomeServiceService, private nzMessage: NzMessageService, private el: ElementRef) {
  }

  ngOnInit() {
    this.getAssetRatio();
  }

}
