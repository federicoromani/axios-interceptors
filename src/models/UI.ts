export enum IconMessage {
  danger = 'mdi-alert-circle-outline',
  warning = 'mdi-alert-outline',
  info = 'mdi-information-variant',
  success = 'mdi-check-circle-outline'
}

export enum ColorMessage {
  danger = 'deep-orange-accent-4',
  warning = 'yellow-darken-3',
  info = 'light-blue-darken-4',
  success = 'teal-darken-2'
}

export interface Toast {
  titleMessage: string;
  message: string;
  typeMessage: string;
  show: boolean;
}

export interface Loader {
  show: boolean;
}
