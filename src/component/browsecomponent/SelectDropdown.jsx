'use client';

import { Label, ListBox, Select } from '@heroui/react';
import { useState } from 'react';

const SelectDropdown = ({ selectedCategory, onCategoryChange }) => {
  const [selected, setSelected] = useState(new Set([selectedCategory || 'all']));

  const handleSelectionChange = (keys) => {
    const selectedValue = Array.from(keys)[0];
    setSelected(new Set([selectedValue]));
    
    if (selectedValue === 'all') {
      onCategoryChange('');
    } else {
      onCategoryChange(selectedValue);
    }
  };

  return (
    <Select 
      className="w-64" 
      placeholder="Select category"
      selectedKeys={selected}
      onSelectionChange={handleSelectionChange}
    >
      <Label className="mb-2 block text-sm font-medium text-gray-300">
        Filter By Category
      </Label>

      <Select.Trigger className="h-11 rounded-xl border border-gray-700 bg-gray-900 px-4 text-white transition-all hover:border-orange-400 focus:border-blue-500">
        <Select.Value className="text-gray-200" />
        <Select.Indicator className="text-gray-400" />
      </Select.Trigger>

      <Select.Popover className="rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
        <ListBox className="p-2">
          <ListBox.Item id="all" textValue="All Categories" className="rounded-lg text-gray-200 hover:bg-orange-500/20 hover:text-orange-400">
            All Categories
          </ListBox.Item>
          <ListBox.Item id="Breakfast" textValue="Breakfast" className="rounded-lg text-gray-200 hover:bg-orange-500/20 hover:text-orange-400">
            Breakfast
          </ListBox.Item>
          <ListBox.Item id="Lunch" textValue="Lunch" className="rounded-lg text-gray-200 hover:bg-orange-500/20 hover:text-orange-400">
            Lunch
          </ListBox.Item>
          <ListBox.Item id="Dinner" textValue="Dinner" className="rounded-lg text-gray-200 hover:bg-orange-500/20 hover:text-orange-400">
            Dinner
          </ListBox.Item>
          <ListBox.Item id="Dessert" textValue="Dessert" className="rounded-lg text-gray-200 hover:bg-orange-500/20 hover:text-orange-400">
            Dessert
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
