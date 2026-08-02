import React from 'react';
import ReactSelect from 'react-select';

const controlStyles = (base, state) => ({
  ...base,
  backgroundColor: 'rgb(249 250 251)',
  borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(209 213 219)',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  minHeight: '42px',
  boxShadow: state.isFocused ? '0 0 0 1px rgb(59 130 246)' : 'none',
  '&:hover': { borderColor: 'rgb(209 213 219)' },
});

const optionStyles = (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? 'rgb(59 130 246)'
    : state.isFocused
      ? 'rgb(243 244 246)'
      : 'white',
  color: state.isSelected ? 'white' : 'rgb(17 24 39)',
  fontSize: '0.875rem',
  cursor: 'pointer',
});

const Typeahead = ({ id, options, onChange, placeholder, selected }) => {
  const selectOptions = options.map((opt) => ({ value: opt, label: opt }));
  const selectedValue = selected?.[0] ? { value: selected[0], label: selected[0] } : null;

  return (
    <ReactSelect
      inputId={id}
      options={selectOptions}
      value={selectedValue}
      onChange={(option) => onChange(option ? [option.value] : [])}
      placeholder={placeholder}
      isSearchable
      isClearable
      styles={{
        control: controlStyles,
        option: optionStyles,
        placeholder: (base) => ({ ...base, color: 'rgb(156 163 175)', fontSize: '0.875rem' }),
        input: (base) => ({ ...base, fontSize: '0.875rem', color: 'rgb(17 24 39)' }),
        singleValue: (base) => ({ ...base, fontSize: '0.875rem', color: 'rgb(17 24 39)' }),
        menu: (base) => ({ ...base, borderRadius: '0.5rem', zIndex: 20 }),
      }}
    />
  );
};

export default Typeahead;
