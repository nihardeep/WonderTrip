import { PRICE_RANGES } from '../../data/constants';

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange
}) => {
  return (
    <div className="lg:w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>

        {/* Categories */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value=""
                checked={!selectedPriceRange}
                onChange={() => onPriceRangeChange(null)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
              />
              <span className="ml-2 text-gray-700">All Prices</span>
            </label>
            {PRICE_RANGES.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.label}
                  checked={selectedPriceRange?.label === range.label}
                  onChange={() => onPriceRangeChange(range)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-gray-700">
                  {range.label} (${range.min} - ${range.max === Infinity ? '+' : range.max})
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onCategoryChange('All');
            onPriceRangeChange(null);
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
