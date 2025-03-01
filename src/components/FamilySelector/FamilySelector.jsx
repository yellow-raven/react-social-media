import "./FamilySelector.css";
import React, { useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { Modal } from "../Modal/Modal";

export const FamilySelector = () => {
  const [showFamilyList, setShowFamilyList] = useState(false);

  // Mock data for all available families with their complete details
  const familiesData = {
    "hugues-doe": {
      id: "hugues-doe",
      name: "Hugues Doe",
      deliveryAddress: {
        street: "123 Family Street",
        cityPostal: "Montreal, QC H2T 2M2"
      },
      nextEditionCutoff: "2024-04-15"
    },
    "williams-family": {
      id: "williams-family",
      name: "Gerry and Kelly Williams",
      deliveryAddress: {
        street: "456 Williams Ave",
        cityPostal: "Vancouver, BC V6B 2J4"
      },
      nextEditionCutoff: "2024-04-20"
    }
  };

  // State to track the current active family
  const [activeFamilyId, setActiveFamilyId] = useState("hugues-doe");

  // Get the current active family details
  const activeFamily = familiesData[activeFamilyId];

  // List of all families for the selector
  const families = Object.values(familiesData);

  const handleFamilyChange = (familyId) => {
    setActiveFamilyId(familyId);
    setShowFamilyList(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="family-selector-container">
        <div className="active-family-header">
          <h2>{activeFamily.name}</h2>
          <div className="family-actions">
            <button 
              className="switch-family-btn"
              onClick={() => setShowFamilyList(true)}
              title="Switch Family Feed"
            >
              <IoSwapHorizontal />
            </button>
            <button 
              className="join-family-btn"
              onClick={() => {/* Handle join family */}}
              title="Join New Family"
            >
              <IoAdd />
            </button>
          </div>
        </div>

        <div className="family-details">
          <div className="detail-item">
            <label>Next Edition Cutoff:</label>
            <p>{formatDate(activeFamily.nextEditionCutoff)}</p>
          </div>
          <div className="detail-item">
            <label>Delivery Address:</label>
            <p>{activeFamily.deliveryAddress.street}</p>
            <p className="city-postal">{activeFamily.deliveryAddress.cityPostal}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showFamilyList}
        onClose={() => setShowFamilyList(false)}
        title="Switch Family Feed"
      >
        <div className="family-list-modal">
          {families.map(family => (
            <div
              key={family.id}
              className={`family-option ${family.id === activeFamily.id ? 'active' : ''}`}
              onClick={() => handleFamilyChange(family.id)}
            >
              <div className="family-option-content">
                <h4>{family.name}</h4>
                <p className="family-address">
                  {family.deliveryAddress.street}<br />
                  {family.deliveryAddress.cityPostal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}; 