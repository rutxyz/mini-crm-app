import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CampaignPage.css'; // Import CSS file

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchPastCampaigns();
  }, []);

  const fetchPastCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/campaigns');
      const sortedCampaigns = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setCampaigns(sortedCampaigns);
    } catch (error) {
      console.error('Error fetching past campaigns:', error);
    }
  };

  // Function to format date as "dd mm yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="campaign-page-container"> 
      <div>
        <h2>Past Campaigns</h2>
        <table className="campaign-table"> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id}>
                <td>{campaign.name}</td>
                <td>{campaign.description}</td>
                <td>{formatDate(campaign.startDate)}</td>
                <td>{formatDate(campaign.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignPage;
