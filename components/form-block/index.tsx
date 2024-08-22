"use client";

'use client'

// Tools
import { motion } from "framer-motion"
import { useState } from "react";

// Types
import { FormBlockType } from "@/types/components/form-block-type";

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const CtaForm: React.FC<FormBlockType> = ({ 
  active,
  componentIndex,
  anchor,
  content,
  formId,
 }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://usebasin.com/f/${formId}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
      });

      if (response.ok) {
       

        // Show success message with download link as a fallback
        setSuccessMessage(
          "Your file is ready for download. If it didn't start automatically, click the link below."
        );
      } else {
        alert("There was an issue submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'form-block-' + componentIndex}`}
        className="form-block w-full px-5"
      >
        <motion.div 
            className='container py-16 lg:py-24 flex flex-col justify-center items-center p-5 bg-white w-full border-2 border-black min-h-24'
            initial={{ 
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{ 
              opacity: 1,
              scale: 1
            }}
            viewport={{ once: true }} 
            transition={{ 
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: 'spring',
              duration: 1.5
            }}
          >
            {content && (
              <div className='prose text-center max-w-4xl pb-5 md:pb-10'>
                <SimpleText content={content} />
              </div>
            )}
            {formId && (
              <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name='lastName' value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Company Email</Label>
                  <Input id="email" type="email" name='email' value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    name="companySize"
                    onValueChange={(value: string) => setFormData({ ...formData, companySize: value })}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full flex justify-center">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          </motion.div>
      </section>
    );
  }
};

export default CtaForm;
