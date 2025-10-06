import React from "react";
import { OutlineChartIcon } from "./OutlineIcons";

export default function ChartPlaceholder({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center h-64 bg-white rounded-md ${className}`}
    >
      <div className="text-center text-gray-400">
        <div className="flex items-center justify-center mb-3">
          <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
            <OutlineChartIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Graphique des ventes à implémenter
        </div>
        <div className="text-xxs text-gray-400">
          Analytics avec @nivo/charts
        </div>
      </div>
    </div>
  );
}
