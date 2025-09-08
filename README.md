# Financial Dashboard

A responsive and feature-rich financial dashboard application built with React, TypeScript, and Tailwind CSS. This project showcases a modern UI with interactive charts, dynamic data filtering, comprehensive report generation (PDF/PNG), and custom data visualization via CSV uploads.

![Financial Dashboard Screenshot](https://storage.googleapis.com/aistudio-project-files/5a44358a-a43c-4734-9189-9b93282b86e0/5a44358a-a43c-4734-9189-9b93282b86e0)

## ✨ Features

- **Responsive Design**: Optimized for a seamless experience on desktop, tablet, and mobile devices.
- **Interactive Charts**: Visualizes complex data using a Donut chart for client distribution, a Composed Bar/Line chart for SIP business, and an Area chart for Monthly MIS, all powered by Recharts.
- **Dark Mode**: A sleek, eye-friendly dark theme that can be toggled on and off.
- **Dynamic Filtering**: Filter dashboard data by various time periods (3, 7, 10, 30 Days) with a single click.
- **Comprehensive Report Downloads**: Download a complete, pixel-perfect report of the entire dashboard as either a **PDF** or a **PNG** image.
- **Individual PDF Reports**: Download high-quality, theme-aware PDF reports for individual metrics (AUM, SIP) and charts.
- **CSV Data Upload**: Upload your own data via a CSV file to dynamically populate and visualize it on the dashboard.
- **Robust Error Handling**: User-friendly toast notifications provide clear feedback for successes and specific errors (e.g., invalid CSV format).
- **Loading Animations**: Subtle skeleton loaders and chart-specific animations provide a smooth user experience while data is being fetched.
- **Mobile-First Enhancements**: Includes PWA-like meta tags for a native app feel when added to a mobile home screen.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **PDF/Image Generation**: jsPDF, html2canvas
- **Build Tool**: Vite (or similar modern bundler)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and a package manager like npm or yarn installed on your system.

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/financial-dashboard.git
    cd financial-dashboard
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

## 📄 CSV Data Format

To use the "Upload CSV" feature, your CSV file must adhere to a specific format.

- The file **must** have a header row: `type,col1,col2,col3,col4`
- Each subsequent row represents a piece of data, identified by the `type` column.

Here are the expected formats for each `type`:

| Type | col1 (string) | col2 (string/number) | col3 (string/number) | col4 (number) | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **client** | `Category Name` | `Value` | *(empty)* | *(empty)* | Data for the **Clients** donut chart. |
| **sip** | `Month` | `UV Value` | `PV Value` | *(empty)* | Data for the **SIP Business** bar/line chart. |
| **mis** | `Month` | `UV Value` | `PV Value` | `AMT Value` | Data for the **Monthly MIS** area chart. |
| **stat** | `Title` | `Value` | `Detail` | *(empty)* | Data for the summary **Stat Cards**. |

### Example CSV (`test/demo.csv`)

```csv
type,col1,col2,col3,col4
client,Online CSV,5000,,
client,New CSV,750,,
sip,Jan,2.5,130,
mis,Jan,0.55,0.35,0.45
stat,Purchases,75,15.00 Cr,
```

You can use the provided `test/demo.csv` file to test the upload functionality.
