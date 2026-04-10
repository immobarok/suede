export type Message = {
  role: "assistant" | "user";
  content: string;
  type?: "text" | "measurement-input" | "measurement-confirm" | "complete";
  field?: string;
  label?: string;
  unit?: string;
  inputType?: "height" | "number";
  tip?: string;
  video?: string;
};

export type MeasurementStep = {
  field: string;
  label: string;
  inputType: "height" | "number";
  unit: string;
  intro: string;
  tip: string;
  video: string;
  followUp: string;
};
