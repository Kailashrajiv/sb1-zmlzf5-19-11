import React, { useState } from 'react';
import { Calculator, Send, X, Plus } from 'lucide-react';
import { PriceCalculator } from './PriceCalculator';

interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
}

type PricingBase = 'MCX' | 'LME';

export default function GetQuotePage() {
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [pricingBase, setPricingBase] = useState<PricingBase>('MCX');
  const [premium, setPremium] = useState<number>(0);
  const [freight, setFreight] = useState<number>(0);

  const [suppliers] = useState<Supplier[]>([
    { id: '1', name: 'Supplier A', phone: '+91 9876543210', email: 'suppliera@example.com' },
    { id: '2', name: 'Supplier B', phone: '+91 9876543211', email: 'supplierb@example.com' },
  ]);

  const products: Product[] = [
    { id: '1', name: 'Aluminium Ingots' },
    { id: '2', name: 'Aluminium Wire Rods' },
    { id: '3', name: 'Aluminium Billets' },
  ];

  const makes = ['NALCO', 'HINDALCO', 'VEDANTA'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle quote submission
    console.log({
      supplier: selectedSupplier,
      product: selectedProduct,
      make: selectedMake,
      pricingBase,
      premium,
      freight
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Price Calculators */}
        <div className="col-span-12 lg:col-span-8">
          <PriceCalculator />
        </div>

        {/* Request Quote Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-100 h-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Request Quote
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Supplier Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Supplier
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddSupplier(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>

              {/* Make Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make
                </label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select make</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing Base */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Base
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPricingBase('MCX')}
                    className={`px-4 py-2.5 rounded-lg text-center transition-colors ${
                      pricingBase === 'MCX'
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                        : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    MCX Based
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricingBase('LME')}
                    className={`px-4 py-2.5 rounded-lg text-center transition-colors ${
                      pricingBase === 'LME'
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                        : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    LME Based
                  </button>
                </div>
              </div>

              {/* Premium Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Premium ({pricingBase === 'MCX' ? '₹' : '$'})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {pricingBase === 'MCX' ? '₹' : '$'}
                  </span>
                  <input
                    type="number"
                    value={premium}
                    onChange={(e) => setPremium(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter premium amount"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Freight Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Freight (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={freight}
                    onChange={(e) => setFreight(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter freight amount"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                Send RFQ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}