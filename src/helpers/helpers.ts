interface Range {
  upper: number;
  lower: number;
  name: string;
}

const ranges: Array<Range> = [
  {
    upper: 999,
    lower: 30,
    name: 'Obese',
  },
  {
    upper: 29.9,
    lower: 25,
    name: 'Overweight',
  },
  {
    upper: 24.9,
    lower: 18.5,
    name: 'Normal',
  },
  {
    upper: 18.4,
    lower: 0,
    name: 'Underweight',
  },
];

/**
 * Calculates BMI from weight in kgs and height in cms
 */
export const calculateBMI = (weight: number, height: number): number =>
  weight / Math.pow(height / 100, 2);

/**
 * Returns a range for a given BMI
 */
export const getRange = (bmi: number): Range =>
  ranges.find(({ upper, lower }) => bmi <= upper && bmi >= lower)!;

/**
 * Converts lbs to kg
 */
export const lbsToKg = (lbs: number): number => lbs * 0.45359237;

/**
 * Converts feet + inches to cm
 */
export const feetToCm = (feet: number, inches: number): number =>
  feet * 30.48 + inches * 2.54;
