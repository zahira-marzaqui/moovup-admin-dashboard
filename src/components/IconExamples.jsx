import React from "react";
import IconBox from "./IconBox";
import {
  ChartBarIcon,
  ShoppingBagIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "./Icons";

export default function IconExamples() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <IconBox variant="pink" size="w-10 h-10">
            <ChartBarIcon className="w-6 h-6 text-pink-500" />
          </IconBox>
          <div>
            <div className="text-2xl font-bold">0 MAD</div>
            <div className="text-sm text-gray-500">
              Chiffre d'affaires total
            </div>
          </div>
          <div className="ml-auto flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
            <span className="ml-1">+12.5%</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <IconBox variant="blue" size="w-10 h-10">
            <ShoppingBagIcon className="w-6 h-6 text-blue-500" />
          </IconBox>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-500">Total commandes</div>
          </div>
          <div className="ml-auto flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
            <span className="ml-1">+8.2%</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <IconBox variant="purple" size="w-10 h-10">
            <CalendarIcon className="w-6 h-6 text-purple-500" />
          </IconBox>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-gray-500">Total réservations</div>
          </div>
          <div className="ml-auto flex items-center text-sm text-green-600">
            <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
            <span className="ml-1">+15.1%</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <IconBox variant="gray" size="w-10 h-10">
            <UserGroupIcon className="w-6 h-6 text-gray-700" />
          </IconBox>
          <div>
            <div className="text-2xl font-bold">2,847</div>
            <div className="text-sm text-gray-500">Utilisateurs actifs</div>
          </div>
          <div className="ml-auto flex items-center text-sm text-red-600">
            <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
            <span className="ml-1">-2.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
