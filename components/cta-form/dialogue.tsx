"use client"

import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { DefaultImageType } from "@/types/objects/default-img-type"

interface FormProps {
  file: DefaultImageType
  formId: string
  buttonText: string
}

const CtaFormDialogue: React.FC<FormProps> = ({
  file,
  formId,
  buttonText
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companySize: "",
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch(`https://usebasin.com/f/${formId}`, {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })

      if (response.ok) {
        
        // Trigger file download
        const link = document.createElement("a")
        link.href = file.asset.url // Use the `file` prop passed to the component
        link.download = file.asset.url.split('/').pop() ?? ''; // Get the filename from the URL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Show success message with download link as a fallback
        setSuccessMessage('Your file is ready for download. If it didn\'t start automatically, click the link below.')
      } else {
        alert('There was an issue submitting the form. Please try again.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        
        {successMessage ? (
          <div className="text-center space-y-3 prose">
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="pb-3">{successMessage}</p>
            <a href={file.asset.url} download={file.asset.url.split('/').pop()} >
              <Button variant="outline">Download File</Button>
            </a>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Download the Checklist</DialogTitle>
              <DialogDescription>Fill out the form below to download the file.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <DialogFooter>
                <Button type="submit">Download File</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CtaFormDialogue
