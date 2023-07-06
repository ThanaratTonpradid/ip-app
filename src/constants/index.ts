export enum DefaultMessage {
  ACCESS_DENIED = 'Access Denied!',
  INVALID_API_KEY = 'Invalid api key',
  INVALID_TOKEN = 'Invalid token',
  INVALID_CREDENTIALS = 'Invalid credentials',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  SOMETHING_WENT_WRONG = 'Something went wrong',
  SESSION_EXPIRED = 'Session expired',
}

export enum ErrorCode {
  INVALID_API_KEY = 'INVALID_API_KEY',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SOMETHING_WENT_WRONG = 'SOMETHING_WENT_WRONG',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
}

export enum ConstantName {
  SESSION_KEY = 'owa.session.id',
  OWA_TRACKER_TEMPLATE_KEY = 'OWA:TRACKER:TEMPLATE',
  OWA_NAME = 'OWA_NAME',
  OWA_BASE_URL = 'OWA_BASE_URL',
}

export enum SettingName {
  OWA_NAME = 'OWA_NAME',
  OWA_BASE_URL = 'OWA_BASE_URL',
}

export enum ConfigName {
  APP = 'APP',
}

export enum TypeOrmConfigName {
  OWA = 'OWA',
}

export enum ConnectionName {
  OWA = 'OWA',
}
