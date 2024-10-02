'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const categories = [
  "Technology", "Health", "Education", "Finance", "Entertainment",
  "Food", "Travel", "Fashion", "Sports", "Environment", 
  "Construction", "Marketing", "Sales", "Customer Service", 
  "Human Resources", "Accounting", "Legal", "Real Estate", 
  "Insurance", "Banking"
]

type Idea = {
  title: string
  description: string
  marketDemand: number
  marketSupply: number
}

export default function StartupIdeaGenerator() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleSubmit = async () => {
    if (selectedCategories.length < 3) {
      alert("Please select at least 3 categories")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: selectedCategories })
      })
      const data = await response.json()
      
      // Add error checking for the response
      if (Array.isArray(data)) {
        setIdeas(data)
      } else {
        console.error('Unexpected response format:', data)
        alert('Received an unexpected response format. Please try again.')
      }
    } catch (error) {
      console.error('Error generating ideas:', error)
      alert('Failed to generate ideas. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Startup Idea Generator</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {categories.map(category => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox 
              id={category} 
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
      <Button 
        onClick={handleSubmit} 
        disabled={selectedCategories.length < 3 || isLoading}
        className="w-full mb-6"
      >
        {isLoading ? 'Generating Ideas...' : 'Generate Ideas'}
      </Button>
      {Array.isArray(ideas) && ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{idea.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{idea.description}</p>
                <div className="flex justify-between text-sm">
                  <span>Demand: {idea.marketDemand}/10</span>
                  <span>Supply: {idea.marketSupply}/10</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center">No ideas generated yet. Select categories and click "Generate Ideas".</p>
          <p className="text-center">"Can't find your category? Want to suggest more? Submit your request here."</p>
        </div>
      )}
    </div>
  )
}