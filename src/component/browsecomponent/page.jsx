'use client';

import { Label, ListBox, Select } from '@heroui/react';

const SelectDropdown = () => {
  return (
    <Select className="w-[256px]" placeholder="Select one">
      <Label>Sort By</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida" className="text-black">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            id="delaware"
            textValue="Delaware"
            className="text-black"
          >
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            id="california"
            textValue="California"
            className="text-black"
          >
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas" className="text-black">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            id="new-york"
            textValue="New York"
            className="text-black"
          >
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            id="washington"
            textValue="Washington"
            className="text-black"
          >
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
