import React, { useState } from 'react';
import { Calculator, AlertCircle, ArrowRight } from 'lucide-react';
import { useMCXPrice } from '../hooks/useMCXPrice';
import { useLMEHistory } from '../hooks/useLMEHistory';

const DUTY_FACTOR = 1.0825;
const RBI_RATE = 84.4063;
const MCX_PRICE = 243.75;
const LME_PRICE = 2639.50;

export function PriceCalculator() {
  const [mcxPremium, setMcxPremium] = useState<number>(0);
  const [mcxFreight, setMcxFreight] = useState<number>(0);
  const [lmePremium, setLmePremium] = useState<number>(0);
  const [lmeFreight, setLmeFreight] = useState<number>(0);

  const calculateMCXTotal = () => {
    return MCX_PRICE + mcxPremium + mcxFreight;
  };

  const calculateLMETotal = () => {
    return (((LME_PRICE + lmePremium) * DUTY_FACTOR * RBI_RATE) + lmeFreight) / 1000;
  };

  const PriceInput = ({ label, value, onChange, prefix = "₹", disabled = false, hint = "" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{prefix}</span>
        </div>
        <input
          type="number"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg ${
            disabled 
              ? 'bg-gray-50 text-gray-700' 
              : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          } [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </div>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* MCX Calculator */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            MCX Based Price
          </h2>
        </div>

        <div className="space-y-6">
          <PriceInput
            label="MCX Aluminum Price"
            value={MCX_PRICE}
            onChange={() => {}}
            disabled={true}
            hint="Live MCX price"
          />

          <PriceInput
            label="Premium per kg"
            value={mcxPremium}
            onChange={(e) => setMcxPremium(Number(e.target.value))}
          />

          <PriceInput
            label="Freight per kg"
            value={mcxFreight}
            onChange={(e) => setMcxFreight(Number(e.target.value))}
          />

          <div className="pt-4 border-t border-blue-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Price (per kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="text"
                value={calculateMCXTotal().toFixed(2)}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-white border border-blue-200 rounded-lg font-bold text-blue-700 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LME Calculator */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm p-6 border border-purple-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calculator className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            LME Based Price
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <PriceInput
              label="LME Price"
              value={LME_PRICE}
              onChange={() => {}}
              prefix="$"
              disabled={true}
              hint="Live LME price"
            />

            <PriceInput
              label="Premium"
              value={lmePremium}
              onChange={(e) => setLmePremium(Number(e.target.value))}
              prefix="$"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duty Factor
              </label>
              <input
                type="text"
                value={DUTY_FACTOR}
                disabled
                className="w-full px-4 py-2.5 bg-white/50 border border-purple-100 rounded-lg text-gray-700"
              />
            </div>

            <PriceInput
              label="RBI Rate"
              value={RBI_RATE}
              onChange={() => {}}
              disabled={true}
            />
          </div>

          <PriceInput
            label="Freight per kg"
            value={lmeFreight}
            onChange={(e) => setLmeFreight(Number(e.target.value))}
          />

          <div className="pt-4 border-t border-purple-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Price (per kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="text"
                value={calculateLMETotal().toFixed(2)}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-white border border-purple-200 rounded-lg font-bold text-purple-700 text-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}