
import { jsPDF } from "jspdf";
import { Question } from "@/components/tests/QuestionCard";

interface TestSummary {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
}

export const generateTestResultPDF = (questions: Question[], answers: Record<number, number>, summary: TestSummary) => {
  const doc = new jsPDF();
  
  // Add header with logo
  doc.setFontSize(22);
  doc.setTextColor(0, 100, 200);
  doc.text("EduQuest Test Results", 105, 20, { align: "center" });
  
  // Add summary
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Score: ${summary.score}%`, 20, 40);
  doc.text(`Correct Answers: ${summary.correctAnswers}/${summary.totalQuestions}`, 20, 50);
  doc.text(`Time Spent: ${summary.timeSpent}`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
  
  // Add divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 80, 190, 80);
  
  // Add questions and answers
  doc.setFontSize(14);
  doc.text("Questions and Answers", 105, 90, { align: "center" });
  
  let yPosition = 100;
  
  questions.forEach((question, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Question number and text
    doc.setFont(undefined, 'bold');
    doc.text(`Question ${index + 1}: ${question.question}`, 20, yPosition, { 
      maxWidth: 170 
    });
    
    const questionHeight = doc.getTextDimensions(question.question, { maxWidth: 170 }).h;
    yPosition += questionHeight + 10;
    
    // User's answer
    const userAnswerIndex = answers[question.id];
    const userAnswer = question.options[userAnswerIndex];
    const correctAnswer = question.options[question.correctOption];
    
    doc.setFont(undefined, 'normal');
    doc.text(`Your answer: ${userAnswer || 'Not answered'}`, 25, yPosition);
    yPosition += 10;
    
    // Indicate if correct or incorrect
    if (userAnswerIndex === question.correctOption) {
      doc.setTextColor(0, 150, 0);
      doc.text("✓ Correct", 25, yPosition);
    } else {
      doc.setTextColor(200, 0, 0);
      doc.text("✗ Incorrect", 25, yPosition);
      yPosition += 10;
      doc.text(`Correct answer: ${correctAnswer}`, 25, yPosition);
    }
    
    // Add explanation if available
    if (question.explanation) {
      yPosition += 10;
      doc.setTextColor(100, 100, 100);
      doc.text(`Explanation: ${question.explanation}`, 25, yPosition, {
        maxWidth: 160
      });
      
      const explanationHeight = doc.getTextDimensions(question.explanation, { maxWidth: 160 }).h;
      yPosition += explanationHeight;
    }
    
    yPosition += 20;
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `EduQuest - Generated on ${new Date().toLocaleString()} - Page ${i} of ${pageCount}`,
      105,
      285,
      { align: "center" }
    );
  }
  
  // Save the PDF
  doc.save("EduQuest-Test-Results.pdf");
};
