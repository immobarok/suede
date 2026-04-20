"use client";

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { 
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted/20 rounded" />
});

export type ChartType = "reviews" | "listings" | "submissions" | "updates";

interface DashboardChartProps {
  type: ChartType;
  height?: number;
  width?: number | string;
}

const DashboardChart = ({ type, height = 40, width = "100%" }: DashboardChartProps) => {
  
  const getChartConfig = () => {
    switch (type) {
      case "reviews":
        return {
          series: [3, 8, 12, 5, 2],
          options: {
            chart: {
              type: "donut" as const,
              sparkline: { enabled: true },
              toolbar: { show: false }
            },
            colors: ["#fbbf24", "#10b981", "#ef4444", "#f97316", "#8b5cf6"],
            legend: { show: false },
            dataLabels: { enabled: false },
            plotOptions: {
              pie: {
                donut: { size: "50%" },
                expandOnClick: false
              }
            },
            stroke: { width: 0 },
            tooltip: { enabled: false }
          },
          chartType: "donut" as const
        };

      case "listings":
        return {
          series: [{
            name: "Listings",
            data: [98, 105, 112, 118, 122, 128]
          }],
          options: {
            chart: {
              type: "area" as const,
              sparkline: { enabled: true },
              toolbar: { show: false }
            },
            stroke: { curve: "smooth" as const, width: 2 },
            fill: {
              type: "gradient" as const,
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.05,
              }
            },
            colors: ["#10b981"],
            tooltip: { enabled: false },
            grid: { show: false }
          },
          chartType: "area" as const
        };

      case "submissions":
        return {
          series: [{
            name: "Submissions",
            data: [4, 7, 5, 9, 8, 11, 12]
          }],
          options: {
            chart: {
              type: "line" as const,
              sparkline: { enabled: true },
              toolbar: { show: false }
            },
            stroke: { curve: "smooth" as const, width: 2 },
            colors: ["#8b5cf6"],
            markers: { size: 3 },
            tooltip: { enabled: false },
            grid: { show: false }
          },
          chartType: "line" as const
        };

      case "updates":
        return {
          series: [42],
          options: {
            chart: {
              type: "radialBar" as const,
              sparkline: { enabled: true },
              toolbar: { show: false }
            },
            plotOptions: {
              radialBar: {
                startAngle: -90,
                endAngle: 90,
                hollow: { size: "60%" },
                track: { background: "#e4e4e7" },
                dataLabels: {
                  name: { show: false },
                  value: { 
                    show: true, 
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#18181b",
                    offsetY: -2
                  }
                }
              }
            },
            colors: ["#f97316"],
            tooltip: { enabled: false }
          },
          chartType: "radialBar" as const
        };

      default:
        return {
          series: [],
          options: {},
          chartType: "line" as const
        };
    }
  };

  const config = getChartConfig();

  return (
    <ReactApexChart
      options={config.options as ApexCharts.ApexOptions}
      series={config.series}
      type={config.chartType}
      height={height}
      width={width}
    />
  );
};

export default DashboardChart;
