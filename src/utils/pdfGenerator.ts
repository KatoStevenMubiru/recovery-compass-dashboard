import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";

export const generateDailyReportPDF = async (
  element: HTMLElement,
  date: Date
): Promise<void> => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Add title
    pdf.setFontSize(24);
    pdf.text("Daily Recovery Report", pageWidth / 2, margin, {
      align: "center",
    });

    // Add date
    pdf.setFontSize(14);
    pdf.text(format(date, "MMMM d, yyyy"), pageWidth / 2, margin + 10, {
      align: "center",
    });

    // Convert the report content to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Calculate dimensions to fit the content
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the content to the PDF
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      margin,
      margin + 20,
      imgWidth,
      imgHeight
    );

    // Save the PDF
    pdf.save(`daily-report-${format(date, "yyyy-MM-dd")}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
