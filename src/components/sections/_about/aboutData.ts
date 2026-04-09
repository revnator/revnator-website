export interface AboutMissionData {
  label: string
  heading: string
  paragraphs: string[]
}

export interface AboutMilestone {
  year: string
  title: string
  description: string
}

export interface AboutStoryData {
  label: string
  heading: string
  milestones: AboutMilestone[]
}

export interface AboutValue {
  icon: string
  title: string
  description: string
}

export interface AboutValuesData {
  label: string
  heading: string
  values: AboutValue[]
}

export interface AboutFounder {
  initials: string
  name: string
  title: string
  bio: string
}

export interface AboutTeamData {
  label: string
  heading: string
  subheading: string
  founder: AboutFounder
}

export const aboutMissionData: AboutMissionData = {
  label: 'OUR MISSION',
  heading: 'Sales tools should help you sell, not slow you down.',
  paragraphs: [
    'Most CRMs are built for managers who track activity. Revnator is built for closers who drive revenue. We obsess over speed, simplicity, and the feeling of being in flow.',
    'Every feature we ship answers one question: does this help a salesperson close more deals, faster? If the answer is no, it doesn\u2019t ship.',
  ],
}

export const aboutStoryData: AboutStoryData = {
  label: 'OUR STORY',
  heading: 'How we got here',
  milestones: [
    {
      year: '2024',
      title: 'The frustration',
      description:
        'Sabareesh, working as a solo founder, realized he was spending more time managing 5 different sales tools than actually selling. He decided there had to be a better way.',
    },
    {
      year: '2025',
      title: 'First lines of code',
      description:
        'Revnator\u2019s first prototype shipped in March 2025 \u2014 a unified workspace combining contacts, email sequences, and pipeline. Built nights and weekends.',
    },
    {
      year: '2025',
      title: 'First customers',
      description:
        'By Q4, the first wave of beta users joined. Their feedback shaped what Revnator is today: a sales OS built by closers, for closers.',
    },
    {
      year: '2026',
      title: 'Public launch',
      description:
        'Revnator launches to the world. 9 integrated modules. One platform. Built for the lean B2B sales teams who refuse to drown in tools.',
    },
  ],
}

export const aboutValuesData: AboutValuesData = {
  label: 'WHAT WE BELIEVE',
  heading: 'The principles that guide every decision',
  values: [
    {
      icon: 'Zap',
      title: 'Speed over scope',
      description:
        'We\u2019d rather ship 10 great features than 100 average ones. Every feature must justify its place in the product.',
    },
    {
      icon: 'Users',
      title: 'Built for users, not buyers',
      description:
        'Most CRMs are designed to win deals with procurement. We design for the person who opens the app every morning.',
    },
    {
      icon: 'Heart',
      title: 'Honest pricing, always',
      description:
        'No \u201Ccontact sales\u201D tricks. No hidden enterprise tiers. Our prices are public, simple, and stay that way.',
    },
  ],
}

export const aboutTeamData: AboutTeamData = {
  label: 'THE TEAM',
  heading: 'Meet the founder',
  subheading:
    'Revnator is currently a solo-founder operation. We\u2019re growing soon.',
  founder: {
    initials: 'S',
    name: 'Sabareesh S R',
    title: 'Founder & CEO',
    bio: 'Former sales operator turned founder. Built Revnator after years of fighting bloated CRMs that slowed his teams down. Believes the best sales tools are the ones reps actually want to use.',
  },
}
