import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: number;
  trendType: "positive" | "negative" | "neutral";
  chartColor: string;
}

export const StatsCard = ({
  title,
  value,
  trend,
  trendType,
  chartColor,
}: StatsCardProps) => {
  const getTrendColor = () => {
    switch (trendType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-orange-300";
    }
  };

  const getChartBackground = () => {
    switch (chartColor) {
      case "green":
        return "bg-gradient-to-b from-green-500/30 to-white";
      case "red":
        return "bg-gradient-to-b from-red-500/30 to-white";
      case "orange":
        return "bg-gradient-to-b from-orange-500/30 to-white";
      case "blue":
        return "bg-gradient-to-b from-sky-500/30 to-white";
      default:
        return "bg-gradient-to-b from-gray-500/30 to-white";
    }
  };

  const getIconColor = () => {
    switch (trendType) {
      case "positive":
        return "ti ti-arrow-up-circle text-green-600";
      case "negative":
        return "ti ti-arrow-down-circle text-red-600";
      default:
        return "ti ti-minus-circle text-orange-300";
    }
  };

  return (
    <article className="flex gap-1.5 items-start p-6 bg-white rounded-xl border border-solid w-full">
      <div className={`h-24 rounded w-[152px] ${getChartBackground()}`} />
      <div className="flex flex-col flex-1 justify-between h-24">
        <h3 className="text-lg text-sky-950">{title}</h3>
        <p className="text-3xl font-bold tracking-tight text-gray-500">
          {value}
        </p>
        <div
          className={`flex gap-2 items-center text-sm font-bold ${getTrendColor()}`}
        >
          <i className={getIconColor()} />
          <span>{trend.toFixed(2)} %</span>
        </div>
      </div>
    </article>
  );
};
