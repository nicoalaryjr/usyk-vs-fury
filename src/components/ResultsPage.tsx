import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Result {
  name: string;
  fighter: string;
  round: string;
  timing?: string;
  additionalNotes?: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[] | null>(null);
  const [trend, setTrend] = useState<string>('');
  const language = navigator.language.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // TODO: Implement actual API call
        const mockResults = [
          { name: 'John', fighter: 'Usyk', round: '3', timing: 'early' },
          { name: 'Jane', fighter: 'Fury', round: 'points' },
        ];
        
        setResults(mockResults);
        
        const trendText = language === 'fr' 
          ? "Pour l'instant, la majorité pense qu'Usyk gagnera par KO au début du 3ème round"
          : "So far, people think Usyk will win by knockout early in the 3rd round";
        
        setTrend(trendText);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center mb-2">Fury vs Usyk</CardTitle>
          <p className="text-xl text-center text-gray-600 font-semibold mt-4">{trend}</p>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Name</th>
                  <th className="p-2 border text-left">Fighter</th>
                  <th className="p-2 border text-left">Round</th>
                  <th className="p-2 border text-left">Timing</th>
                  <th className="p-2 border text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{result.name}</td>
                    <td className="p-2 border">{result.fighter}</td>
                    <td className="p-2 border">{result.round}</td>
                    <td className="p-2 border">{result.timing || '-'}</td>
                    <td className="p-2 border">{result.additionalNotes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}