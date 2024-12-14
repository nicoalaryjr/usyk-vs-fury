// src/components/FightPredictionForm.tsx
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

interface FormData {
  name: string;
  email: string;
  fighter: 'Fury' | 'Usyk' | '';
  round: string;
  timing: 'Early' | 'Middle' | 'Late' | '';
  additionalNotes: string;
}

const CONTENT = {
  en: {
    title: "Fury vs Usyk",
    subtitle: "Undisputed Heavyweight Championship Prediction Contest",
    description: "The historic clash for all the belts - WBC, WBA, IBF, WBO, and The Ring heavyweight titles",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    additionalNotes: "Additional notes about your prediction (optional, max 250 characters)",
    submitting: "Submitting...",
    sendPrediction: "Send Prediction",
    byPoints: "By Points",
    round: "R",
    early: "Early",
    middle: "Middle",
    late: "Late"
  }
} as const;

export default function FightPredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    fighter: '',
    round: '',
    timing: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const canSelectFighter = formData.name && formData.email && isValidEmail(formData.email);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFighterSelect = (fighter: FormData['fighter']) => {
    if (!canSelectFighter) return;
    setFormData(prev => ({
      ...prev,
      fighter,
      round: '',
      timing: ''
    }));
  };

  const handleRoundSelect = (round: string) => {
    setFormData(prev => ({
      ...prev,
      round,
      timing: ''
    }));
  };

  const handleTimingSelect = (timing: FormData['timing']) => {
    setFormData(prev => ({
      ...prev,
      timing
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual submission logic
      console.log('Submitting prediction:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        fighter: '',
        round: '',
        timing: '',
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error submitting prediction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center mb-2">{CONTENT.en.title}</CardTitle>
          <p className="text-center text-gray-600">{CONTENT.en.subtitle}</p>
          <p className="text-sm text-center text-gray-500 mt-2">{CONTENT.en.description}</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                name="name"
                placeholder={CONTENT.en.nameLabel}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder={CONTENT.en.emailLabel}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(['Fury', 'Usyk'] as const).map((fighter) => (
                <div 
                  key={fighter}
                  className={`relative cursor-pointer transition-transform duration-300 ${
                    formData.fighter === fighter ? 'scale-105' : ''
                  } ${!canSelectFighter && 'opacity-50 cursor-not-allowed'}`}
                  onClick={() => handleFighterSelect(fighter)}
                >
                  <img
                    src={`/api/placeholder/200/300`}
                    alt={fighter}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
                    {fighter}
                  </div>
                </div>
              ))}
            </div>

            {formData.fighter && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <Button
                      key={i}
                      type="button"
                      variant={formData.round === `${i + 1}` ? "default" : "outline"}
                      onClick={() => handleRoundSelect(`${i + 1}`)}
                      className="w-full"
                    >
                      {CONTENT.en.round}{i + 1}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant={formData.round === 'points' ? "default" : "outline"}
                    onClick={() => handleRoundSelect('points')}
                    className="col-span-4"
                  >
                    {CONTENT.en.byPoints}
                  </Button>
                </div>
              </div>
            )}

            {formData.round && formData.round !== 'points' && (
              <div className="grid grid-cols-3 gap-2 animate-fade-in">
                {(['Early', 'Middle', 'Late'] as const).map((timing) => (
                  <Button
                    key={timing}
                    type="button"
                    variant={formData.timing === timing ? "default" : "outline"}
                    onClick={() => handleTimingSelect(timing)}
                  >
                    {timing}
                  </Button>
                ))}
              </div>
            )}

            {formData.round && (
              <div className="animate-fade-in">
                <Textarea
                  name="additionalNotes"
                  placeholder={CONTENT.en.additionalNotes}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  maxLength={250}
                  className="h-24 resize-none"
                />
              </div>
            )}

            {formData.round && (formData.timing || formData.round === 'points') && (
              <Button
                type="submit"
                className="w-full h-12 text-lg animate-fade-in"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-pulse">{CONTENT.en.submitting}</div>
                ) : CONTENT.en.sendPrediction}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}