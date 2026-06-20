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
          <ListBox.Item id="new" textValue="New" className="text-black">
            New
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item
            id="tranding"
            textValue="Tranding"
            className="text-black"
          >
            Tranding
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="hot" textValue="Hot" className="text-black">
            Hot
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default SelectDropdown;
