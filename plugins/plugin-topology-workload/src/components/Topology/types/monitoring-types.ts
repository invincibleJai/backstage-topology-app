export const enum AlertStates {
  Firing = 'firing',
  NotFiring = 'not-firing',
  Pending = 'pending',
  Silenced = 'silenced',
}

export const enum SilenceStates {
  Active = 'active',
  Expired = 'expired',
  Pending = 'pending',
}

export const enum AlertSeverity {
  Critical = 'critical',
  Info = 'info',
  None = 'none',
  Warning = 'warning',
}

export const enum RuleStates {
  Firing = 'firing',
  Inactive = 'inactive',
  Pending = 'pending',
  Silenced = 'silenced',
}

export type PrometheusLabels = { [key: string]: string };

export type PrometheusRule = {
  alerts: PrometheusAlert[];
  annotations: PrometheusLabels;
  duration: number;
  labels: PrometheusLabels & {
    severity?: string;
  };
  name: string;
  query: string;
  state: RuleStates;
  type: string;
};

export type Rule = PrometheusRule & {
  id: string;
  silencedBy?: Silence[];
};

export type Silence = {
  comment: string;
  createdBy: string;
  endsAt: string;
  firingAlerts: Alert[];
  id?: string;
  matchers: { isEqual?: boolean; isRegex: boolean; name: string; value: string }[];
  name?: string;
  startsAt: string;
  status?: { state: SilenceStates };
  updatedAt?: string;
};

export type PrometheusAlert = {
  activeAt?: string;
  annotations: PrometheusLabels;
  labels: PrometheusLabels & {
    alertname: string;
    severity?: AlertSeverity | string;
  };
  state: AlertStates;
  value?: number | string;
};

export type Alert = PrometheusAlert & {
  rule: Rule;
  silencedBy?: Silence[];
};

export type Alerts = {
  data: Alert[];
  loaded: boolean;
  loadError?: string | Error;
};