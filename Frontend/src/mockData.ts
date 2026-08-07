import type { Clip } from './types';

export const SAMPLE_URLS = [
  {
    name: 'Lex Fridman & Sam Altman',
    url: 'https://youtube.com/watch?v=sample-lex-altman',
    duration: '2h 14m',
    title: 'The Future of AI & Human Consciousness',
    clipsCount: 8,
  },
  {
    name: 'MrBeast Secret to 100M Views',
    url: 'https://youtube.com/watch?v=sample-mrbeast-viral',
    duration: '45m 12s',
    title: 'How I Built a $500M YouTube Empire',
    clipsCount: 12,
  },
  {
    name: 'Huberman Lab: Dopamine Reset',
    url: 'https://youtube.com/watch?v=sample-huberman-dopamine',
    duration: '1h 38m',
    title: 'Master Your Focus and Neural Drive',
    clipsCount: 6,
  },
  {
    name: 'Alex Hormozi $100M Leads',
    url: 'https://youtube.com/watch?v=sample-hormozi-leads',
    duration: '1h 05m',
    title: 'How to Get Unlimited Customers for Free',
    clipsCount: 10,
  }
];

export const MOCK_CLIPS: Clip[] = [
  {
    id: 'clip-1',
    title: '🔥 The 3-Second Rule That Got Me 50M Views',
    duration: '0:42',
    startTime: '04:12',
    endTime: '04:54',
    viralityScore: 98,
    hookSummary: 'High emotional punch line in the first 1.8 seconds with immediate curiosity loop.',
    transcriptSnippet: 'If you fail the first 3 seconds, 99% of people scroll away instantly.',
    aspectRatio: '9:16',
    hashtags: ['#CreatorTips', '#ViralShorts', '#GrowthHacks', '#Shortify'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    viewsEstimate: '250K - 1.2M',
    captionStyle: 'hormozi'
  },
  {
    id: 'clip-2',
    title: '🧠 Why Your Brain Craves High-Dopamine Content',
    duration: '0:58',
    startTime: '12:30',
    endTime: '13:28',
    viralityScore: 94,
    hookSummary: 'Strong neuroscience insight with surprising twist about focus.',
    transcriptSnippet: 'Dopamine isn\'t pleasure. It is the anticipation of pleasure that drives action.',
    aspectRatio: '9:16',
    hashtags: ['#Neuroscience', '#Mindset', '#Focus', '#Productivity'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    viewsEstimate: '180K - 850K',
    captionStyle: 'beast'
  },
  {
    id: 'clip-3',
    title: '💡 How to Make $10k/Month with AI Short Videos',
    duration: '0:35',
    startTime: '28:15',
    endTime: '28:50',
    viralityScore: 96,
    hookSummary: 'Direct monetary benefit hook with step-by-step actionable summary.',
    transcriptSnippet: 'Stop overthinking the algorithm. Just convert long podcasts into viral clips.',
    aspectRatio: '9:16',
    hashtags: ['#SideHustle', '#AISaaS', '#ShortsAutomation', '#Business'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    viewsEstimate: '320K - 1.5M',
    captionStyle: 'hormozi'
  },
  {
    id: 'clip-4',
    title: '⚡ The Secret AI Tool Top Creators Don\'t Tell You',
    duration: '0:48',
    startTime: '35:10',
    endTime: '35:58',
    viralityScore: 91,
    hookSummary: 'Contrarian opinion with high retention hook.',
    transcriptSnippet: 'The biggest channels aren\'t editing manually anymore. They use automated AI pipelines.',
    aspectRatio: '9:16',
    hashtags: ['#ContentStrategy', '#AIEditing', '#ReelsTips'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    viewsEstimate: '140K - 600K',
    captionStyle: 'neon'
  }
];
