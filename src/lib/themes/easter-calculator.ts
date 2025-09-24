/**
 * Easter Date Calculator - Western/Gregorian Calendar
 * Uses the algorithm to calculate Easter Sunday for any given year
 */

/**
 * Calculate Easter Sunday date for a given year (Western/Gregorian calendar)
 * Based on the algorithm for computing Easter Sunday
 */
function calculateEaster(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return { month, day };
}

/**
 * Generate Easter date ranges for multiple years
 * @param startYear - Starting year to calculate from
 * @param yearsAhead - Number of years to calculate ahead
 * @returns Record of year -> date range for Easter theme
 */
export function generateEasterDates(
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
    const easter = calculateEaster(year);
    
    // Calculate start date (2 days before Easter Sunday)
    let startDay = easter.day - 2;
    let startMonth = easter.month;
    
    // Handle month boundary (if Easter is on 1st or 2nd of month)
    if (startDay <= 0) {
      startMonth = easter.month - 1;
      if (startMonth <= 0) {
        startMonth = 12;
      }
      // Get days in previous month
      const daysInPrevMonth = new Date(year, startMonth, 0).getDate();
      startDay = daysInPrevMonth + startDay;
    }

    dates[year] = {
      start: {
        month: startMonth,
        day: startDay,
      },
      end: easter, // Easter Sunday
    };
  }

  return dates;
}

/**
 * Get Easter dates for current year and next 10 years
 * This function is called automatically when the module loads
 */
export function getCurrentEasterDates(): Record<
  number,
  {
    start: { month: number; day: number };
    end: { month: number; day: number };
  }
> {
  const currentYear = new Date().getFullYear();
  return generateEasterDates(currentYear, 10);
}

/**
 * Check if we should update Easter dates (for future use)
 * Currently not used but available for automatic updates
 */
export function shouldUpdateEasterDates(): boolean {
  const today = new Date();
  const isFirstMarch = today.getMonth() === 2 && today.getDate() === 1; // March = 2
  
  // For now, always return false since we generate dates on-demand
  // This could be enhanced later for automatic yearly updates
  return isFirstMarch;
}

/**
 * Validate calculated Easter date (for testing)
 */
export function validateEasterDate(year: number, expectedMonth: number, expectedDay: number): boolean {
  const calculated = calculateEaster(year);
  return calculated.month === expectedMonth && calculated.day === expectedDay;
}

// Export the calculator function for testing
export { calculateEaster };
