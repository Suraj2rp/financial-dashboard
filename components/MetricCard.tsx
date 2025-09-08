
import React, { useRef } from 'react';
import { TrendingUpIcon, ChevronRightIcon, DownloadIcon } from './icons/Icons';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : 'text-red-500';
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    // Hide buttons within this specific card for capture
    const buttonsToHide = cardElement.querySelectorAll('.download-button, .pdf-hide');
    buttonsToHide.forEach(el => (el as HTMLElement).style.visibility = 'hidden');

    const isDarkMode = document.documentElement.classList.contains('dark');

    html2canvas(cardElement, {
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

        pdf.save(`${title.toLowerCase()}-report.pdf`);
    }).catch(err => {
        console.error(`Could not generate PDF for ${title}`, err);
        alert(`Sorry, there was an error generating the PDF for ${title}.`);
    }).finally(() => {
        // Show buttons again after capture
        buttonsToHide.forEach(el => (el as HTMLElement).style.visibility = 'visible');
    });
  };


  return (
    <div ref={cardRef} className="bg-white dark:bg-dark-card p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current</p>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{title} {value}</h2>
        </div>
        <button 
          onClick={handleDownloadPdf} 
          className="download-button pdf-hide flex items-center text-sm text-primary-red font-medium select-none"
        >
          <DownloadIcon className="w-4 h-4 mr-1"/>
          Download Report
        </button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className={`flex items-center text-sm ${changeColor}`}>
          <TrendingUpIcon className="h-5 w-5 mr-1" />
          <span>{change}</span>
        </div>
        <a href="#" className="flex items-center text-sm text-blue-500 dark:text-blue-400 font-medium pdf-hide select-none">
          View Trend <ChevronRightIcon className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default MetricCard;