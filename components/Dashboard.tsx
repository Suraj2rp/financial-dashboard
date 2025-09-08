
import React, { useState, useEffect, useRef } from 'react';
import MetricCard from './MetricCard';
import StatCard from './StatCard';
import ClientChart from './ClientChart';
import SipChart from './SipChart';
import MisChart from './MisChart';
import { MOCK_DATA } from '../constants';
import { ClientData, SipData, MisData, StatData } from '../types';
import { PurchasesIcon, RedemptionIcon, RejectedIcon, SipRejectIcon, NewSipIcon, DownloadIcon, ChevronDownIcon, FileTextIcon, ImageIcon, UploadIcon, ChartBarIcon } from './icons/Icons';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type DownloadFormat = 'pdf' | 'png';
type NotificationType = { message: string; type: 'success' | 'error' };

const initialTimeFilters = ['3 Days', '7 Days', '10 Days', '30 Days'];
type ChartDataType = {
  clients: ClientData[];
  sip: SipData[];
  mis: MisData[];
  stats: StatData[];
};

const iconMap: { [key: string]: React.ReactNode } = {
    "Purchases": <PurchasesIcon />,
    "Redemptions": <RedemptionIcon />,
    "Rej. Transactions": <RejectedIcon />,
    "SIP Rejections": <SipRejectIcon />,
    "New SIP": <NewSipIcon />,
};

const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('7 Days');
  const [timeFilters, setTimeFilters] = useState(initialTimeFilters);
  const [csvData, setCsvData] = useState<ChartDataType | null>(null);
  const [chartData, setChartData] = useState(MOCK_DATA[activeFilter]);
  const [loading, setLoading] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat | null>(null);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [isParsingCsv, setIsParsingCsv] = useState(false);
  
  const clientChartRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (activeFilter === 'CSV Data' && csvData) {
        setChartData(csvData);
      } else if (MOCK_DATA[activeFilter]) {
        setChartData(MOCK_DATA[activeFilter]);
      }
      setLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, [activeFilter, csvData]);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setIsDownloadMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect to clear notification after a delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDownloadClientChartPdf = () => {
    const chartElement = clientChartRef.current;
    if (!chartElement) return;

    const buttonToHide = chartElement.querySelector('.download-button') as HTMLElement | null;
    if (buttonToHide) {
        buttonToHide.style.visibility = 'hidden';
    }
    
    const isDarkMode = document.documentElement.classList.contains('dark');

    html2canvas(chartElement, {
        useCORS: true,
        scale: 2,
        backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
    }).then((canvas) => {
        const headerHeight = 60;
        const padding = 20;
        const pdfWidth = canvas.width + 2 * padding;
        const pdfHeight = canvas.height + headerHeight + (padding * 2);

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
        });

        const pageBgColor = isDarkMode ? '#1A202C' : '#F8F9FA';
        const headerBgColor = isDarkMode ? '#2D3748' : '#FFFFFF';
        const textColor = isDarkMode ? '#FFFFFF' : '#1A202C';
        const logoColor = '#3B82F6';

        pdf.setFillColor(pageBgColor);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

        // Draw header background
        pdf.setFillColor(headerBgColor);
        pdf.rect(padding, padding, pdfWidth - 2 * padding, headerHeight, 'F');
        
        // Draw logo
        const logoSize = 30;
        const logoY = padding + (headerHeight - logoSize) / 2;
        const logoX = padding * 2;
        pdf.setFillColor(logoColor);
        pdf.rect(logoX, logoY, logoSize, logoSize, 'F');

        // Draw header text
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22); // Refined font size
        pdf.setTextColor(textColor);
        const textX = logoX + logoSize + 12; // Refined spacing
        const textY = padding + headerHeight / 2; // Vertical center
        pdf.text('Wealth Elite', textX, textY, { baseline: 'middle' }); // Centered text
        
        const imgData = canvas.toDataURL('image/png');
        const contentY = padding + headerHeight + padding;
        pdf.addImage(imgData, 'PNG', padding, contentY, canvas.width, canvas.height);
        
        pdf.save('clients-report.pdf');
    }).catch(err => {
        console.error("Could not generate PDF for client chart", err);
        setNotification({ message: "Sorry, there was an error generating the PDF.", type: 'error' });
    }).finally(() => {
        if (buttonToHide) {
            buttonToHide.style.visibility = 'visible';
        }
    });
  };
  
  const captureAndSave = async (format: DownloadFormat) => {
    const dashboardElement = dashboardRef.current;
    if (!dashboardElement) {
        setIsGeneratingReport(false);
        setDownloadFormat(null);
        return;
    }

    const elementsToHide = dashboardElement.querySelectorAll('.pdf-hide');
    elementsToHide.forEach(el => (el as HTMLElement).style.visibility = 'hidden');
    
    window.scrollTo(0, 0);
    const isDarkMode = document.documentElement.classList.contains('dark');

    try {
        const canvas = await html2canvas(dashboardElement, {
            useCORS: true,
            scale: 2,
            backgroundColor: isDarkMode ? '#1A202C' : '#F8F9FA',
            width: dashboardElement.scrollWidth,
            height: dashboardElement.scrollHeight,
        });

        if (format === 'png') {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'financial-dashboard-report.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else { // PDF
            const headerHeight = 60;
            const padding = 20;
            const pdfWidth = canvas.width + 2 * padding;
            const pdfHeight = canvas.height + headerHeight + (padding * 2);

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [pdfWidth, pdfHeight]
            });

            const pageBgColor = isDarkMode ? '#1A202C' : '#F8F9FA';
            const headerBgColor = isDarkMode ? '#2D3748' : '#FFFFFF';
            const textColor = isDarkMode ? '#FFFFFF' : '#1A202C';
            const logoColor = '#3B82F6';

            pdf.setFillColor(pageBgColor);
            pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
            
            // Draw header background
            pdf.setFillColor(headerBgColor);
            pdf.rect(padding, padding, pdfWidth - 2 * padding, headerHeight, 'F');
            
            // Draw logo
            const logoSize = 30;
            const logoY = padding + (headerHeight - logoSize) / 2;
            const logoX = padding * 2;
            pdf.setFillColor(logoColor);
            pdf.rect(logoX, logoY, logoSize, logoSize, 'F');

            // Draw header text
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(22); // Refined font size
            pdf.setTextColor(textColor);
            const textX = logoX + logoSize + 12; // Refined spacing
            const textY = padding + headerHeight / 2; // Vertical center
            pdf.text('Wealth Elite', textX, textY, { baseline: 'middle' }); // Centered text

            const imgData = canvas.toDataURL('image/png', 1.0);
            const contentY = padding + headerHeight + padding;
            pdf.addImage(imgData, 'PNG', padding, contentY, canvas.width, canvas.height);
            pdf.save('financial-dashboard-report.pdf');
        }
    } catch (err) {
        console.error(`Could not generate dashboard ${format}`, err);
        setNotification({ message: `Sorry, there was an error generating the ${format}.`, type: 'error' });
    } finally {
        elementsToHide.forEach(el => (el as HTMLElement).style.visibility = 'visible');
        setIsGeneratingReport(false);
        setDownloadFormat(null);
    }
  };

  useEffect(() => {
    if (isGeneratingReport && downloadFormat) {
      const timer = setTimeout(() => captureAndSave(downloadFormat), 100);
      return () => clearTimeout(timer);
    }
  }, [isGeneratingReport, downloadFormat]);
  
  const handleDownloadRequest = (format: DownloadFormat) => {
      setIsDownloadMenuOpen(false);
      setNotification({ message: `Generating ${format.toUpperCase()}, please wait...`, type: 'success' });
      setDownloadFormat(format);
      setIsGeneratingReport(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const parseCsvData = (csvText: string): ChartDataType => {
    const lines = csvText.trim().split(/\r\n|\n/);
    const header = lines.shift()?.trim().toLowerCase().split(',');

    if (!header || header.join(',') !== 'type,col1,col2,col3,col4') {
        throw new Error("Invalid CSV header. Expected 'type,col1,col2,col3,col4'.");
    }

    if (lines.length === 0) {
        throw new Error("File is empty or contains only a header row.");
    }

    const data: ChartDataType = { clients: [], sip: [], mis: [], stats: [] };

    lines.forEach((line, index) => {
        const lineNumber = index + 2; // +1 for 0-index, +1 for header
        if (!line.trim()) return; // Skip empty lines
        
        const values = line.trim().split(',');
        const type = values[0]?.trim();

        const checkColumns = (expected: number) => {
            if (values.length < expected) {
                throw new Error(`Incorrect number of columns for type '${type}' on line ${lineNumber}. Expected ${expected}, found ${values.length}.`);
            }
        };

        const safeParseFloat = (value: string, colName: string): number => {
            const num = parseFloat(value);
            if (isNaN(num)) {
                throw new Error(`Invalid number format for '${colName}' on line ${lineNumber}. Found: '${value}'.`);
            }
            return num;
        };

        switch (type) {
            case 'client':
                checkColumns(3);
                data.clients.push({ name: values[1], value: safeParseFloat(values[2], 'value') });
                break;
            case 'sip':
                checkColumns(4);
                data.sip.push({ name: values[1], uv: safeParseFloat(values[2], 'uv'), pv: safeParseFloat(values[3], 'pv') });
                break;
            case 'mis':
                checkColumns(5);
                data.mis.push({ name: values[1], uv: safeParseFloat(values[2], 'uv'), pv: safeParseFloat(values[3], 'pv'), amt: safeParseFloat(values[4], 'amt') });
                break;
            case 'stat':
                checkColumns(4);
                data.stats.push({ title: values[1], value: values[2], detail: values[3] });
                break;
            default:
                // Silently ignore unknown types
                break;
        }
    });

    if (data.clients.length === 0 && data.sip.length === 0 && data.mis.length === 0 && data.stats.length === 0) {
        throw new Error("CSV file contains no valid data rows of known types (client, sip, mis, stat).");
    }
    return data;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsingCsv(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text) {
          throw new Error("File is empty.");
        }
        const parsedData = parseCsvData(text);
        setCsvData(parsedData);
        
        setTimeFilters(prevFilters => {
            const uniqueFilters = new Set([...prevFilters, 'CSV Data']);
            return Array.from(uniqueFilters);
        });

        setActiveFilter('CSV Data');
        setNotification({ message: "CSV data loaded successfully!", type: 'success' });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during CSV parsing.";
        setNotification({ message: errorMessage, type: 'error' });
      } finally {
        if(event.target) event.target.value = '';
        setIsParsingCsv(false);
      }
    };
    reader.onerror = () => {
        setNotification({ message: "Failed to read the file.", type: 'error' });
        setIsParsingCsv(false);
    };
    reader.readAsText(file);
  };

  return (
    <div ref={dashboardRef} className="space-y-6">
       {notification && (
        <div 
          className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white text-sm z-50 transition-transform transform animate-pulse
            ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-600'}`
          }
          style={{ animation: 'fadeInDown 0.5s, fadeOutUp 0.5s 4.5s' }}
        >
          {notification.message}
        </div>
      )}

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard 
          title="AUM"
          value="12.19 Cr"
          change="+0.77% MoM"
          changeType="increase"
        />
        <MetricCard
          title="SIP"
          value="1.39 Lakh"
          change="+0% MoM"
          changeType="increase"
        />
      </div>

      {/* Filters and Main Controls */}
       <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {timeFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all duration-200 select-none transform hover:-translate-y-0.5
                ${
                  activeFilter === filter
                    ? 'bg-primary-red text-white shadow-md'
                    : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-dark-border'
                }`}
            >
              {filter}
            </button>
          ))}
          <div className="pdf-hide">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".csv" 
              className="hidden" 
            />
            <button
              onClick={handleUploadClick}
              disabled={isParsingCsv}
              className="flex items-center justify-center px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-card rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-dark-border select-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              <UploadIcon className={`w-4 h-4 mr-2 ${isParsingCsv ? 'animate-spin' : ''}`} />
              {isParsingCsv ? 'Parsing...' : 'Upload CSV'}
            </button>
          </div>
        </div>
        
        <div ref={downloadMenuRef} className="relative pdf-hide">
            <button
                onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-red rounded-md hover:bg-red-700 transition-colors duration-200 shadow select-none"
            >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download Report
                <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
            {isDownloadMenuOpen && (
                 <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-card rounded-md shadow-lg z-10 border border-gray-200 dark:border-dark-border">
                    <ul className="p-2 space-y-1">
                        <li>
                            <button
                                onClick={() => handleDownloadRequest('pdf')}
                                className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                                <FileTextIcon className="w-5 h-5 mr-3 text-red-500" />
                                <span>Download as PDF</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleDownloadRequest('png')}
                                className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                                <ImageIcon className="w-5 h-5 mr-3 text-blue-500" />
                                <span>Download as PNG</span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
      </div>


      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading 
            ? Array.from({ length: 5 }).map((_, index) => (
                <StatCard 
                    key={`loader-${index}`}
                    loading={true}
                    icon={<></>}
                    title=""
                    value=""
                    detail=""
                />
            ))
            : chartData.stats.map((stat) => (
                <StatCard 
                    key={stat.title}
                    icon={iconMap[stat.title] || <ChartBarIcon />}
                    title={stat.title}
                    value={stat.value}
                    detail={stat.detail}
                />
            ))
        }
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div ref={clientChartRef} className="lg:col-span-1 bg-white dark:bg-dark-card p-4 rounded-lg shadow">
           <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 dark:text-white">CLIENTS</h3>
            <button onClick={handleDownloadClientChartPdf} className="download-button pdf-hide flex items-center text-sm text-primary-red font-medium">
              <DownloadIcon className="w-4 h-4 mr-1"/>
              Download Report
            </button>
          </div>
          <ClientChart data={chartData.clients} loading={loading} isPdfMode={isGeneratingReport} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">SIP BUSINESS CHART</h3>
                <button className="text-sm text-primary-red font-medium pdf-hide">View Report</button>
            </div>
            <SipChart data={chartData.sip} loading={loading} isPdfMode={isGeneratingReport} />
          </div>
          <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 dark:text-white">MONTHLY MIS</h3>
                <button className="text-sm text-primary-red font-medium pdf-hide">View Report</button>
            </div>
            <MisChart data={chartData.mis} loading={loading} isPdfMode={isGeneratingReport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;