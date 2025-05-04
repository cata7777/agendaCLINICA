// src/app/sugerencias-clinicas/page.tsx
import React from 'react';
import AISuggestionSystem from '../../components/clinical/AISuggestionSystem';

export default function ClinicalSuggestionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <AISuggestionSystem />
    </div>
  );
}
