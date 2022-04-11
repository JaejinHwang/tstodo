import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardColor: string;
    positiveColor: string;
    negativeColor: string;
    buttonColor: string;
    subTextColor: string;
    pickerColor: string;
  }
}
