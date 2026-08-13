import React from 'react';

interface Job {
  status: string;
  title: string;
  category: string;
  companyName: string;
  companyLogoText: string;
  verifiedText: string;
  payRate: number;
}

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="job-card">
      <div>
        <div className="job-card-top">
          <span className="job-status">{job.status}</span>
          <button className="favorite-btn">♡</button>
        </div>
        <div className="job-info">
          <h3>{job.title}</h3>
          <p>{job.category}</p>
        </div>
      </div>
      <div className="job-card-bottom">
        <div className="company-info">
          <div className="company-logo">{job.companyLogoText}</div>
          <div>
            <h4>{job.companyName}</h4>
            <span className="verified-text">✓ {job.verifiedText}</span>
          </div>
        </div>
        <div className="pay-rate">
          <span className="amount">${job.payRate}</span>
          <span className="period">/ hour</span>
        </div>
      </div>
    </div>
  );
};