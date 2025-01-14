export interface MonitoringConfig {
  inputType: "url" | "keywords";
  url?: string;
  keywords?: string;
  monitoringType: "price" | "availability";
  priceThreshold?: number;
  notificationType: "email" | "discord" | "sms";
  contactInfo: string;
  dateAdded: string;
  status: "active" | "paused";
} 