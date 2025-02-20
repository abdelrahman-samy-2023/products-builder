'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { categories } from '../../data';
import { ICategory } from '../../interfaces';

interface IProps {
  selected: ICategory;
  setSelected: (category: ICategory) => void;
}

const Select = ({ selected, setSelected }: IProps) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium text-gray-700 mb-1">Category</Label>
      <div className="relative mt-1">
        <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-4 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
          <span className="flex items-center gap-3 truncate">
            <img src={selected.imageURL} alt="Category" className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className={({ focus }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  focus ? 'bg-indigo-600 text-white' : 'text-gray-900'
                }`
              }
            >
              {({ selected, focus }) => (
                <>
                  <div className="flex items-center gap-3">
                    <img src={category.imageURL} alt="Category" className="h-5 w-5 rounded-full" />
                    <span className={`truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {category.name}
                    </span>
                  </div>
                  {selected && (
                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? 'text-white' : 'text-indigo-600'}`}>
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default Select;