
import { ClientData, SipData, MisData, StatData } from './types';

export const NAV_LINKS = [
  "HOME", "CRM", "UTILITIES", "INSURANCE", "ASSETS", "MUTUAL", 
  "RESEARCH", "TRANSACT ONLINE", "GOAL GPS", "FINANCIAL PLANNING", 
  "WEALTH REPORT", "OTHER"
];

export const MOCK_DATA: {
  [key: string]: {
    clients: ClientData[];
    sip: SipData[];
    mis: MisData[];
    stats: StatData[];
  }
} = {
  '3 Days': {
    clients: [
      { name: 'Online', value: 3824 },
      { name: 'New', value: 541 },
      { name: 'Active', value: 60 },
      { name: 'Inactive', value: 2 },
    ],
    sip: [
      { name: 'Mar', uv: 1.8, pv: 112 },
      { name: 'Apr', uv: 1.5, pv: 105 },
      { name: 'May', uv: 2.1, pv: 118 },
    ],
    mis: [
      { name: 'Mar', uv: 0.30, pv: 0.20, amt: 0.25 },
      { name: 'Apr', uv: 0.15, pv: 0.40, amt: 0.30 },
      { name: 'May', uv: 0.45, pv: 0.25, amt: 0.35 },
    ],
    stats: [
        { title: "Purchases", value: "3", detail: "1.12 Cr" },
        { title: "Redemptions", value: "1", detail: "0.45 Cr" },
        { title: "Rej. Transactions", value: "0", detail: "0.00 INR" },
        { title: "SIP Rejections", value: "0", detail: "0.00 INR" },
        { title: "New SIP", value: "5", detail: "0.50 Cr" }
    ]
  },
  '7 Days': {
    clients: [
      { name: 'Online', value: 4100 },
      { name: 'New', value: 600 },
      { name: 'Active', value: 75 },
      { name: 'Inactive', value: 5 },
    ],
    sip: [
      { name: 'Mar', uv: 2.0, pv: 115 },
      { name: 'Apr', uv: 1.8, pv: 110 },
      { name: 'May', uv: 2.2, pv: 120 },
      { name: 'Jun', uv: 1.9, pv: 118 },
    ],
    mis: [
      { name: 'Mar', uv: 0.35, pv: 0.22, amt: 0.28 },
      { name: 'Apr', uv: 0.20, pv: 0.45, amt: 0.32 },
      { name: 'May', uv: 0.50, pv: 0.28, amt: 0.38 },
      { name: 'Jun', uv: 0.40, pv: 0.30, amt: 0.35 },
    ],
     stats: [
        { title: "Purchases", value: "8", detail: "2.50 Cr" },
        { title: "Redemptions", value: "2", detail: "0.80 Cr" },
        { title: "Rej. Transactions", value: "1", detail: "0.10 Cr" },
        { title: "SIP Rejections", value: "0", detail: "0.00 INR" },
        { title: "New SIP", value: "12", detail: "1.20 Cr" }
    ]
  },
  '10 Days': {
    clients: [
      { name: 'Online', value: 4500 },
      { name: 'New', value: 650 },
      { name: 'Active', value: 80 },
      { name: 'Inactive', value: 8 },
    ],
    sip: [
      { name: 'Feb', uv: 1.5, pv: 100 },
      { name: 'Mar', uv: 2.2, pv: 118 },
      { name: 'Apr', uv: 1.9, pv: 112 },
      { name: 'May', uv: 2.4, pv: 125 },
      { name: 'Jun', uv: 2.0, pv: 120 },
    ],
    mis: [
      { name: 'Feb', uv: 0.25, pv: 0.15, amt: 0.20 },
      { name: 'Mar', uv: 0.40, pv: 0.25, amt: 0.32 },
      { name: 'Apr', uv: 0.22, pv: 0.48, amt: 0.35 },
      { name: 'May', uv: 0.55, pv: 0.30, amt: 0.42 },
      { name: 'Jun', uv: 0.45, pv: 0.35, amt: 0.40 },
    ],
     stats: [
        { title: "Purchases", value: "15", detail: "4.20 Cr" },
        { title: "Redemptions", value: "5", detail: "1.50 Cr" },
        { title: "Rej. Transactions", value: "2", detail: "0.25 Cr" },
        { title: "SIP Rejections", value: "1", detail: "0.05 Cr" },
        { title: "New SIP", value: "20", detail: "2.00 Cr" }
    ]
  },
  '30 Days': {
    clients: [
      { name: 'Online', value: 5200 },
      { name: 'New', value: 800 },
      { name: 'Active', value: 120 },
      { name: 'Inactive', value: 15 },
    ],
    sip: [
      { name: 'Jan', uv: 1.2, pv: 95 },
      { name: 'Feb', uv: 1.7, pv: 105 },
      { name: 'Mar', uv: 2.4, pv: 120 },
      { name: 'Apr', uv: 2.0, pv: 115 },
      { name: 'May', uv: 2.5, pv: 128 },
      { name: 'Jun', uv: 2.2, pv: 122 },
    ],
    mis: [
      { name: 'Jan', uv: 0.20, pv: 0.10, amt: 0.15 },
      { name: 'Feb', uv: 0.30, pv: 0.18, amt: 0.24 },
      { name: 'Mar', uv: 0.45, pv: 0.28, amt: 0.36 },
      { name: 'Apr', uv: 0.25, pv: 0.50, amt: 0.38 },
      { name: 'May', uv: 0.60, pv: 0.32, amt: 0.46 },
      { name: 'Jun', uv: 0.50, pv: 0.38, amt: 0.44 },
    ],
     stats: [
        { title: "Purchases", value: "45", detail: "12.80 Cr" },
        { title: "Redemptions", value: "18", detail: "5.60 Cr" },
        { title: "Rej. Transactions", value: "4", detail: "0.75 Cr" },
        { title: "SIP Rejections", value: "2", detail: "0.15 Cr" },
        { title: "New SIP", value: "60", detail: "6.00 Cr" }
    ]
  }
};

export const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];