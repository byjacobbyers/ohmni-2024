'use client'

// Tools
import { useState } from "react"

// Types
import { FormBlockType } from "@/types/components/form-block-type"

// Components
import SimpleText from "@/components/simple-text"

const FormBlock: React.FC<FormBlockType> = ({
  active,
  componentIndex,
  anchor,
  formId,
  content,
  fields,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formMessage, setFormMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setFormSubmitted(true)
        setFormMessage("Thank you for your submission!")
      } else {
        const errorData = await response.json()
        setFormMessage(`Error: ${errorData.error}`)
      }
    } catch (error) {
      setFormMessage("An unexpected error occurred. Please try again.")
    }
  }

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : "form-block-" + componentIndex}`}
        className="form-block w-full px-5"
      >
        <div className="container py-16 lg:py-24 flex flex-col justify-center items-center p-5 bg-white w-full border-2 border-black min-h-24">
          {/* Content */}
          {content && !formSubmitted && (
            <div className="prose 2xl:prose-h2:text-4xl 2xl:prose-h2:leading-relaxed text-center max-w-4xl 2xl:max-w-6xl pb-5 md:pb-10 content">
              <SimpleText content={content} />
            </div>
          )}

          {/* Thank You Message */}
          {formSubmitted && (
            <h2 className="text-2xl font-bold text-center">{formMessage}</h2>
          )}

          {/* Form */}
          {!formSubmitted && (
            <form
              id="my-contact-form"
              className="w-full max-w-2xl flex flex-wrap gap-6"
              action={`https://usebasin.com/f/${formId?.useBasinFormId}`}
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              {fields?.map((field, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    field.width === "half" ? "w-full lg:w-[calc(50%-12px)]" : "w-full"
                  }`}
                >
                  <label
                    htmlFor={field.label}
                    className="text-sm font-medium text-black mb-2"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "string" && (
                    <input
                      id={`field-${index}`}
                      name={field.label}
                      type="text"
                      required={field.required}
                      className="border-2 border-black p-2"
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      id={`field-${index}`}
                      name={field.label}
                      required={field.required}
                      className="border-2 border-black p-2"
                      rows={4}
                    />
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <div className="w-full flex flex-col items-center">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
                >
                  Submit
                </button>
                {formMessage && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    {formMessage}
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    )
  }

  return null
}

export default FormBlock