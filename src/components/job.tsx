import React from 'react';

export interface IJob {
    id: string;
    type: string;
    created_at: string;
    company: string;
    company_url: string;
    location: string;
    title: string;
    description: string;
    how_to_apply: string;
    company_logo: string;
}

const Job: React.FC<IJob> = ({ title }) => {
    return <div>{title}</div>;
}

export default Job;