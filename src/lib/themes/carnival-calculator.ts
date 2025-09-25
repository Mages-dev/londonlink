/**
 * Carnival Date Calculator - Based on Easter calculation
 * Carnival period: Extended from traditional Friday-Tuesday to include full weeks
 */

import { calculateEaster } from "./easter-calculator";

/**
 * Calculate Carnival dates for a given year
 * Traditional Carnival: Friday before Ash Wednesday to Tuesday before Ash Wednesday
 * Extended Carnival: One week before traditional start to Sunday after traditional end
 * 
 * @param year - Year to calculate Carnival for
 * @returns Object with start and end dates for extended Carnival period
 */
export function calculateCarnival(
  year: number
): {
  start: { month: number; day: number };
  end: { month: number; day: number };
} {
  // Step 1: Calculate Easter Sunday for the year
  const easter = calculateEaster(year);
  const easterDate = new Date(year, easter.month - 1, easter.day);

  // Step 2: Calculate Ash Wednesday (46 days before Easter)
  const ashWednesday = new Date(easterDate);
  ashWednesday.setDate(easterDate.getDate() - 46);

  // Step 3: Calculate traditional Carnival Tuesday (1 day before Ash Wednesday)
  const traditionalCarnivalTuesday = new Date(ashWednesday);
  traditionalCarnivalTuesday.setDate(ashWednesday.getDate() - 1);

  // Step 4: Calculate traditional Carnival Friday (4 days before Tuesday)
  const traditionalCarnivalFriday = new Date(traditionalCarnivalTuesday);
  traditionalCarnivalFriday.setDate(traditionalCarnivalTuesday.getDate() - 4);

  // Step 5: EXTEND - Start one week before traditional Friday
  const extendedCarnivalStart = new Date(traditionalCarnivalFriday);
  extendedCarnivalStart.setDate(traditionalCarnivalFriday.getDate() - 7);

  // Step 6: EXTEND - End on Sunday after traditional Tuesday
  const extendedCarnivalEnd = new Date(traditionalCarnivalTuesday);
  // Calculate days until next Sunday
  const dayOfWeek = traditionalCarnivalTuesday.getDay(); // 0 = Sunday, 1 = Monday, ..., 2 = Tuesday
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // If already Sunday, stay; otherwise go to next Sunday
  extendedCarnivalEnd.setDate(traditionalCarnivalTuesday.getDate() + daysUntilSunday);

  return {
    start: {
      month: extendedCarnivalStart.getMonth() + 1,
      day: extendedCarnivalStart.getDate(),
    },
    end: {
      month: extendedCarnivalEnd.getMonth() + 1,
      day: extendedCarnivalEnd.getDate(),
    },
  };
}

/**
 * Generate Carnival date ranges for multiple years
 * @param startYear - Starting year to calculate from
 * @param yearsAhead - Number of years to calculate ahead
 * @returns Record of year -> date range for Carnival theme
 */
export function generateCarnivalDates(
  startYear: number,
  yearsAhead: number = 10
): Record<
  number,
  {
    start: { month: number; day: number };
    end: { month: number; day: number };
  }
> {
  const dates: Record<
    number,
    {
      start: { month: number; day: number };
      end: { month: number; day: number };
    }
  > = {};

  for (let year = startYear; year < startYear + yearsAhead; year++) {
    dates[year] = calculateCarnival(year);
  }

  return dates;
}

/**
 * Get Carnival dates for current year and next 10 years
 * This function is called automatically when the module loads
 */
export function getCurrentCarnivalDates(): Record<
  number,
  {
    start: { month: number; day: number };
    end: { month: number; day: number };
  }
> {
  const currentYear = new Date().getFullYear();
  return generateCarnivalDates(currentYear, 10);
}

/**
 * Get traditional Carnival period (Friday to Tuesday) for comparison
 */
export function getTraditionalCarnivalDates(year: number): {
  start: { month: number; day: number };
  end: { month: number; day: number };
} {
  const easter = calculateEaster(year);
  const easterDate = new Date(year, easter.month - 1, easter.day);

  // Ash Wednesday (46 days before Easter)
  const ashWednesday = new Date(easterDate);
  ashWednesday.setDate(easterDate.getDate() - 46);

  // Traditional Carnival Tuesday (1 day before Ash Wednesday)
  const carnivalTuesday = new Date(ashWednesday);
  carnivalTuesday.setDate(ashWednesday.getDate() - 1);

  // Traditional Carnival Friday (4 days before Tuesday)
  const carnivalFriday = new Date(carnivalTuesday);
  carnivalFriday.setDate(carnivalTuesday.getDate() - 4);

  return {
    start: {
      month: carnivalFriday.getMonth() + 1,
      day: carnivalFriday.getDate(),
    },
    end: {
      month: carnivalTuesday.getMonth() + 1,
      day: carnivalTuesday.getDate(),
    },
  };
}

/**
 * Validate calculated Carnival date (for testing)
 */
export function validateCarnivalDate(
  year: number,
  expectedStartMonth: number,
  expectedStartDay: number,
  expectedEndMonth: number,
  expectedEndDay: number
): boolean {
  const calculated = calculateCarnival(year);
  return (
    calculated.start.month === expectedStartMonth &&
    calculated.start.day === expectedStartDay &&
    calculated.end.month === expectedEndMonth &&
    calculated.end.day === expectedEndDay
  );
}

/**
 * Get detailed Carnival information for a year (for debugging)
 */
export function getCarnivalInfo(year: number): {
  easter: { month: number; day: number };
  ashWednesday: string;
  traditional: { start: string; end: string };
  extended: { start: string; end: string };
  duration: number;
} {
  const easter = calculateEaster(year);
  const easterDate = new Date(year, easter.month - 1, easter.day);
  
  const ashWednesday = new Date(easterDate);
  ashWednesday.setDate(easterDate.getDate() - 46);
  
  const traditional = getTraditionalCarnivalDates(year);
  const extended = calculateCarnival(year);
  
  const startDate = new Date(year, extended.start.month - 1, extended.start.day);
  const endDate = new Date(year, extended.end.month - 1, extended.end.day);
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  return {
    easter,
    ashWednesday: ashWednesday.toLocaleDateString('pt-BR'),
    traditional: {
      start: `${traditional.start.day}/${traditional.start.month}`,
      end: `${traditional.end.day}/${traditional.end.month}`,
    },
    extended: {
      start: `${extended.start.day}/${extended.start.month}`,
      end: `${extended.end.day}/${extended.end.month}`,
    },
    duration,
  };
}
