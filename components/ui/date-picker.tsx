"use client"

import * as React from "react"
import { ChevronDownIcon, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  label?: string
  placeholder?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  required?: boolean
  className?: string
  inputClassName?: string
  buttonClassName?: string
  labelClassName?: string
  id?: string
  name?: string
  minDate?: Date
  maxDate?: Date
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  allowInput?: boolean
  dateFormat?: string
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({
    label = "Date of birth",
    placeholder = "Select date",
    value,
    onChange,
    disabled = false,
    required = false,
    className = "",
    inputClassName = "",
    buttonClassName = "w-48 justify-between font-normal",
    labelClassName = "px-1",
    id,
    name,
    minDate,
    maxDate,
    captionLayout = "dropdown",
    allowInput = true,
    dateFormat = "MM/dd/yyyy",
    ...props
  }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(value)
    const [inputValue, setInputValue] = React.useState("")

    // Update internal state when value prop changes
    React.useEffect(() => {
      setInternalDate(value)
      if (value) {
        setInputValue(formatDateForInput(value, dateFormat))
      } else {
        setInputValue("")
      }
    }, [value, dateFormat])

    // Format date for input display
    const formatDateForInput = (date: Date, format: string): string => {
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear().toString()
      
      return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year)
        .replace('yy', year.slice(-2))
    }

    // Parse input string to date
    const parseInputDate = (input: string): Date | undefined => {
      if (!input.trim()) return undefined
      
      // Handle MM/dd/yyyy format
      const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
      const match = input.match(dateRegex)
      
      if (match) {
        const [, month, day, year] = match
        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        
        // Validate the date
        if (
          parsedDate.getFullYear() === parseInt(year) &&
          parsedDate.getMonth() === parseInt(month) - 1 &&
          parsedDate.getDate() === parseInt(day)
        ) {
          // Check min/max date constraints
          if (minDate && parsedDate < minDate) return undefined
          if (maxDate && parsedDate > maxDate) return undefined
          
          return parsedDate
        }
      }
      
      return undefined
    }

    const handleDateSelect = (date: Date | undefined) => {
      setInternalDate(date)
      onChange?.(date)
      setOpen(false)
      if (date) {
        setInputValue(formatDateForInput(date, dateFormat))
      } else {
        setInputValue("")
      }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      
      const parsedDate = parseInputDate(newValue)
      if (parsedDate) {
        setInternalDate(parsedDate)
        onChange?.(parsedDate)
      } else if (newValue === "") {
        setInternalDate(undefined)
        onChange?.(undefined)
      }
    }

    const handleInputBlur = () => {
      // On blur, try to parse the input and update accordingly
      const parsedDate = parseInputDate(inputValue)
      if (parsedDate) {
        setInputValue(formatDateForInput(parsedDate, dateFormat))
      } else if (inputValue && !parsedDate) {
        // If input is invalid, revert to current date or clear
        if (internalDate) {
          setInputValue(formatDateForInput(internalDate, dateFormat))
        } else {
          setInputValue("")
        }
      }
    }

    const displayDate = value !== undefined ? value : internalDate

    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
        {label && (
          <Label 
            htmlFor={id || "date-picker"} 
            className={labelClassName}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        {allowInput ? (
          <div className="relative">
            <Input
              id={id || "date-picker"}
              name={name}
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={disabled}
              required={required}
              className={cn("pr-10", inputClassName)}
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  disabled={disabled}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={displayDate}
                  onSelect={handleDateSelect}
                  captionLayout={captionLayout}
                  disabled={(date) => {
                    if (minDate && date < minDate) return true
                    if (maxDate && date > maxDate) return true
                    return false
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={id || "date-picker"}
                name={name}
                disabled={disabled}
                className={buttonClassName}
              >
                {displayDate ? displayDate.toLocaleDateString() : placeholder}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={displayDate}
                onSelect={handleDateSelect}
                captionLayout={captionLayout}
                disabled={(date) => {
                  if (minDate && date < minDate) return true
                  if (maxDate && date > maxDate) return true
                  return false
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

export default DatePicker;