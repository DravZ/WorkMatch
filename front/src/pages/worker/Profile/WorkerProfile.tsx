import React, { useState } from 'react';
import { ProfileTabsNav, type TabType } from '../../../components/worker/Profile/ProfileTabsNav/ProfileTabsNav';
import { WorkerSidebar } from '../../../components/worker/Profile/WorkerSidebar/WorkerSidebar';
import { ProfileOverview } from '../../../components/worker/Profile/tabs/ProfileOverview/ProfileOverview';
import { ProfileReviews } from '../../../components/worker/Profile/tabs/ProfileReviews/ProfileReviews';
import { ProfileHistory } from '../../../components/worker/Profile/tabs/ProfileHistory/ProfileHistory';

export const WorkerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const profileData = {
    name: 'Marcus Thompson',
    roleTitle: 'General Laborer & Warehouse Specialist',
    rating: 4.9,
    reviewsCount: 47,
    jobsDone: 52,
    hourlyRate: '$22',
    completionRate: '98%',
    location: 'Brooklyn, NY',
    availability: 'Available now',
    responseTime: 'Usually within 1 hour',
    categories: ['Delivery', 'Moving', 'Construction'],
    profileStrength: 83,
    aboutText:
      'Reliable and hardworking with 6 years of warehouse, logistics, and general labor experience. I show up on time, follow instructions, and take pride in every job I complete. Available 7 days a week.',
    skills: [
      'Forklift certified',
      'Inventory management',
      'Heavy lifting',
      'Pallet jack',
      'OSHA trained',
    ],
    experiences: [
      { title: 'Warehouse Associate', company: 'Amazon Fulfillment Center', period: '2022–2024' },
      { title: 'Delivery Driver', company: 'FedEx Ground', period: '2020–2022' },
      { title: 'Moving Crew Lead', company: 'Two Men and a Truck', period: '2018–2020' },
    ],
    reviews: [
      {
        id: '1',
        reviewer: 'James K.',
        role: 'Warehouse Picker',
        rating: 5,
        date: '2026-07-28',
        comment:
          'Marcus was fantastic. Arrived 10 minutes early, worked efficiently the entire shift, and even helped organize the storage area beyond what was asked. Highly recommend.',
      },
      {
        id: '2',
        reviewer: 'Metro Logistics',
        role: 'Loading Dock Assistant',
        rating: 5,
        date: '2026-07-10',
        comment:
          'One of the most dependable workers we have hired through WorkMatch. Will definitely hire again.',
      },
      {
        id: '3',
        reviewer: 'Sarah M.',
        role: 'Moving Crew',
        rating: 4,
        date: '2026-06-14',
        comment:
          'Great worker, strong and efficient. Slightly late arriving but called ahead to let us know. Good communication overall.',
      },
    ],
    history: [
      { id: '1', title: 'Warehouse Picker', company: 'Metro Logistics Co.', date: '2026-07-28', pay: '$22/hr', rating: 5 },
      { id: '2', title: 'Loading Dock Assistant', company: 'Metro Logistics Co.', date: '2026-07-10', pay: '$22/hr', rating: 5 },
      { id: '3', title: 'Moving Crew Member', company: 'Swift Move NYC', date: '2026-06-14', pay: '$28/hr', rating: 4 },
      { id: '4', title: 'Event Setup', company: 'Prestige Events', date: '2026-05-30', pay: '$25/hr', rating: 5 },
    ],
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">

      <main className="container-fluid max-w-7xl px-3 px-md-5 py-4 flex-grow-1">
        <div className="row g-4">
          {/* Columna Izquierda: Sidebar del Perfil */}
          <div className="col-12 col-lg-4 col-xl-3">
            <WorkerSidebar
              name={profileData.name}
              roleTitle={profileData.roleTitle}
              rating={profileData.rating}
              reviewsCount={profileData.reviewsCount}
              jobsDone={profileData.jobsDone}
              hourlyRate={profileData.hourlyRate}
              completionRate={profileData.completionRate}
              location={profileData.location}
              availability={profileData.availability}
              responseTime={profileData.responseTime}
              categories={profileData.categories}
              profileStrength={profileData.profileStrength}
            />
          </div>

          {/* Columna Derecha: Tabs y Contenido */}
          <div className="col-12 col-lg-8 col-xl-9">
            <ProfileTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'overview' && (
              <ProfileOverview
                aboutText={profileData.aboutText}
                skills={profileData.skills}
                experiences={profileData.experiences}
              />
            )}

            {activeTab === 'reviews' && (
              <ProfileReviews
                overallRating={profileData.rating}
                totalReviews={profileData.reviewsCount}
                ratingsDistribution={[
                  { stars: 5, count: 40, percentage: 85 },
                  { stars: 4, count: 5, percentage: 12 },
                  { stars: 3, count: 2, percentage: 3 },
                  { stars: 2, count: 0, percentage: 0 },
                  { stars: 1, count: 0, percentage: 0 },
                ]}
                reviews={profileData.reviews}
              />
            )}

            {activeTab === 'history' && (
              <ProfileHistory historyItems={profileData.history} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};