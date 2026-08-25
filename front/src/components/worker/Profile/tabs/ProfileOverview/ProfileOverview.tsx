import React from 'react';

interface ProfileOverviewProps {
  aboutText: string;
  skills: string[];
  experiences: { title: string; company: string; period: string }[];
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  aboutText,
  skills,
  experiences,
}) => {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Seccion About */}
      <div className="card border-0 shadow-sm p-4 rounded-4">
        <h2 className="h6 fw-bold text-dark mb-3">About</h2>
        <p className="text-muted small mb-0 lh-lg">{aboutText}</p>
      </div>

      {/* Seccion Skills */}
      <div className="card border-0 shadow-sm p-4 rounded-4">
        <h2 className="h6 fw-bold text-dark mb-3">Skills</h2>
        <div className="d-flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-2 bg-light text-secondary rounded-3 extra-small fw-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Seccion Work Experience */}
      <div className="card border-0 shadow-sm p-4 rounded-4">
        <h2 className="h6 fw-bold text-dark mb-3">Work experience</h2>
        <div  className="list-unstyled mb-0 d-flex flex-column gap-3">
          {`${experiences}`}
        </div>
      </div>
    </div>
  );
};