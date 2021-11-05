import { Chip, TextField } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { FieldHookConfig, useField } from 'formik'
import React from 'react'

import { createTag } from '@helpers/api'

import { Tag } from '.prisma/client'

const filter = createFilterOptions<Tag | { inputValue: string; label: string }>()

const FormChipInput: React.FC<FieldHookConfig<Tag[]> & { label: string; options?: Tag[] }> = ({
  label,
  options = [],
  ...props
}) => {
  const [field /* meta*/, , helpers] = useField(props)

  const { name } = field
  const { setValue } = helpers

  return (
    <Autocomplete
      multiple
      id="tags"
      data-testid="form-tags"
      limitTags={3}
      options={options as (Tag | { inputValue: string; label: string })[]}
      defaultValue={[]}
      {...field}
      freeSolo
      renderTags={(value: Tag[], getTagProps) => {
        return value.map((option: Tag, index: number) => (
          <Chip color="primary" key={option.label} variant="default" label={option.label} {...getTagProps({ index })} />
        ))
      }}
      fullWidth
      getOptionLabel={(option) => option.label}
      filterSelectedOptions
      onChange={async (_event: React.ChangeEvent, newValue: (Tag | { inputValue: string; label: string })[]) => {
        if (newValue !== null && typeof newValue !== 'string') {
          const items = await Promise.all(
            newValue.map((value) => {
              const availableOptionLabels = options.map((option) => option.label)
              // tag is coming with Enter keydown
              if (typeof value === 'string') {
                if (!availableOptionLabels.includes(value)) {
                  return createTag({ label: value })
                } else {
                  return options.filter((option) => option.label === value)[0]
                }
              }

              // tag is coming with filter option selection
              if (typeof value === 'object' && 'inputValue' in value) {
                return createTag({ label: value.inputValue })
              }

              return value
            })
          )
          setValue(items)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            label: `Add "${params.inputValue}"`,
          })
        }

        return filtered
      }}
      renderInput={(params) => (
        <TextField
          name={name}
          {...params}
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
          }}
        />
      )}
    />
  )
}

export default FormChipInput
