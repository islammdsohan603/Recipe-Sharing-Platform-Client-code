'use client';

import { Label, ListBox, Select } from '@heroui/react';

const SelectDropdown = () => {
  return (
    <Select className="w-64" placeholder="Select one">
      <Label className="mb-2 block text-sm font-medium text-gray-300">
        Sort By
      </Label>

      <Select.Trigger className="h-11 rounded-xl border border-gray-700 bg-gray-900 px-4 text-white transition-all hover:border-blue-500 focus:border-blue-500">
        <Select.Value className="text-gray-200" />
        <Select.Indicator className="text-gray-400" />
      </Select.Trigger>

      <Select.Popover className="rounded-xl border border-gray-700 bg-gray-900 shadow-xl">
        <ListBox className="p-2">
          <ListBox.Item
            id="new"
            textValue="New"
            className="rounded-lg text-gray-200 transition-colors hover:bg-blue-500/20 hover:text-blue-400"
          >
            New
            <ListBox.ItemIndicator className="text-blue-400" />
          </ListBox.Item>

          <ListBox.Item
            id="tranding"
            textValue="Trending"
            className="rounded-lg text-gray-200 transition-colors hover:bg-blue-500/20 hover:text-blue-400"
          >
            Trending
            <ListBox.ItemIndicator className="text-blue-400" />
          </ListBox.Item>

          <ListBox.Item
            id="hot"
            textValue="Hot"
            className="rounded-lg text-gray-200 transition-colors hover:bg-blue-500/20 hover:text-blue-400"
          >
            Hot
            <ListBox.ItemIndicator className="text-blue-400" />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
