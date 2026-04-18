type MeasurementInput = {
  heightCm?: number | null;
  weightKg?: number | null;
  bustCm?: number | null;
  waistCm?: number | null;
  hipsCm?: number | null;
  inseamCm?: number | null;
  shoulderWidthCm?: number | null;
  armLengthCm?: number | null;
};

const cmToInches = (cm: number) => cm / 2.54;

export function formatHeightFromCm(heightCm: number | null | undefined) {
  if (!heightCm) return null;

  const totalInches = cmToInches(heightCm);
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  if (inches === 12) {
    return `${feet + 1}'0"`;
  }

  return `${feet}'${inches}"`;
}

export function formatInchesFromCm(valueCm: number | null | undefined) {
  if (!valueCm) return null;
  return `${Math.round(cmToInches(valueCm))}"`;
}

export function formatLbsFromKg(valueKg: number | null | undefined) {
  if (!valueKg) return null;
  return `${Math.round(valueKg * 2.2046226218)} lbs`;
}

export function buildDisplayMeasurements(data: MeasurementInput) {
  return [
    { label: "Height", value: formatHeightFromCm(data.heightCm) },
    { label: "Weight", value: formatLbsFromKg(data.weightKg) },
    { label: "Bust", value: formatInchesFromCm(data.bustCm) },
    { label: "Waist", value: formatInchesFromCm(data.waistCm) },
    { label: "Hips", value: formatInchesFromCm(data.hipsCm) },
    { label: "Inseam", value: formatInchesFromCm(data.inseamCm) },
    { label: "Shoulder Width", value: formatInchesFromCm(data.shoulderWidthCm) },
    { label: "Arm Length", value: formatInchesFromCm(data.armLengthCm) },
  ];
}
