export interface Clip {
  id: string;
  title: string;
  duration: string;
  startTime: string;
  endTime: string;
  viralityScore: number;
  hookSummary: string;
  transcriptSnippet: string;
  aspectRatio: '9:16' | '1:1' | '16:9';
  hashtags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  viewsEstimate: string;
  captionStyle: 'hormozi' | 'beast' | 'minimal' | 'neon';
}

export interface PipelineStage {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  details?: string;
}

export type ViewMode = 'landing' | 'dashboard' | 'editor';
