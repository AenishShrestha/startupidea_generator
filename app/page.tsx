'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Add this type augmentation
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: unknown) => void;
    lastAutoTable: {
      finalY: number;
    };
  }
}

import { Document, Packer, Paragraph, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } from 'docx'

export default function Component() {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cvData, setCvData] = useState({
    jobTitle: '',
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    skills: '',
    education: '',
    certifications: ''
  })
  const [enhancedCV, setEnhancedCV] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCvData(prev => ({ ...prev, [name]: value }))
  }

  const handleEnhanceCV = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/enhance-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvData }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance CV');
      }

      const data = await response.json();
      setEnhancedCV(data.enhancedCV);
      setStep(3);
    } catch (error) {
      console.error('Error enhancing CV:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (format: 'docx' | 'pdf') => {
    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text(`${cvData.jobTitle} CV`, 105, 15, { align: 'center' });
      
      doc.autoTable({
        head: [['Contact Information']],
        body: [
          ['Name', cvData.name],
          ['Email', cvData.email],
          ['Phone', cvData.phone],
          ['Location', cvData.location]
        ],
        startY: 25
      });

      doc.autoTable({
        head: [['Professional Summary']],
        body: [[cvData.summary]],
        startY: doc.lastAutoTable.finalY + 10
      });

      doc.autoTable({
        head: [['Work Experience']],
        body: [[cvData.experience]],
        startY: doc.lastAutoTable.finalY + 10
      });

      doc.autoTable({
        head: [['Skills']],
        body: [[cvData.skills]],
        startY: doc.lastAutoTable.finalY + 10
      });

      doc.autoTable({
        head: [['Education']],
        body: [[cvData.education]],
        startY: doc.lastAutoTable.finalY + 10
      });

      doc.autoTable({
        head: [['Certifications']],
        body: [[cvData.certifications]],
        startY: doc.lastAutoTable.finalY + 10
      });

      doc.save('cv.pdf');
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: `${cvData.jobTitle} CV`,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: 'Contact Information',
              heading: HeadingLevel.HEADING_2
            }),
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Name')],
                    }),
                    new TableCell({
                      children: [new Paragraph(cvData.name)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Email')],
                    }),
                    new TableCell({
                      children: [new Paragraph(cvData.email)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Phone')],
                    }),
                    new TableCell({
                      children: [new Paragraph(cvData.phone)],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('Location')],
                    }),
                    new TableCell({
                      children: [new Paragraph(cvData.location)],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              text: 'Professional Summary',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(cvData.summary),
            new Paragraph({
              text: 'Work Experience',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(cvData.experience),
            new Paragraph({
              text: 'Skills',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(cvData.skills),
            new Paragraph({
              text: 'Education',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(cvData.education),
            new Paragraph({
              text: 'Certifications',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(cvData.certifications),
          ],
        }],
      });

      Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.docx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-4">
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <div>
            <Label htmlFor="jobTitle">Job Title/Industry</Label>
            <Input id="jobTitle" name="jobTitle" value={cvData.jobTitle} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={cvData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={cvData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={cvData.phone} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={cvData.location} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Next</Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); handleEnhanceCV(); }} className="space-y-4">
          <h2 className="text-2xl font-bold">Professional Details</h2>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea id="summary" name="summary" value={cvData.summary} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="experience">Work Experience</Label>
            <Textarea id="experience" name="experience" value={cvData.experience} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Textarea id="skills" name="skills" value={cvData.skills} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Textarea id="education" name="education" value={cvData.education} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="certifications">Certifications</Label>
            <Textarea id="certifications" name="certifications" value={cvData.certifications} onChange={handleInputChange} />
          </div>
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enhancing CV with Groq
              </>
            ) : (
              'Generate ATS-Friendly CV'
            )}
          </Button>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your ATS-Friendly CV</h2>
          <div className="space-y-4 border p-4 rounded">
            <ReactMarkdown>{enhancedCV}</ReactMarkdown>
          </div>
          <div className="flex space-x-4">
            <Button onClick={() => handleDownload('docx')}>Download DOCX</Button>
            <Button onClick={() => handleDownload('pdf')}>Download PDF</Button>
          </div>
        </div>
      )}
    </div>
  )
}