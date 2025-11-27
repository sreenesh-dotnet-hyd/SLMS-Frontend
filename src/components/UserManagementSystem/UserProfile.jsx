import React, { useState } from "react";
import AssignedLicenses from "./AssignedLicenses";
import UserDevices from "./UserDevices";
import "./UserProfile.css";

export default function UserProfile({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) return <p>Select a user to view profile.</p>;

  return (
    <div className="userprofile-container">
      <h2>{user.displayName} ({user.userId})</h2>
      <div className="userprofile-tabs">
        <button onClick={() => setActiveTab("profile")} className={activeTab==="profile" ? "active" : ""}>Profile</button>
        <button onClick={() => setActiveTab("devices")} className={activeTab==="devices" ? "active" : ""}>Devices</button>
        <button onClick={() => setActiveTab("entitlements")} className={activeTab==="entitlements" ? "active" : ""}>Entitlements</button>
      </div>

      <div className="userprofile-content">
        {activeTab === "profile" && (
          <div className="userprofile-section">
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Location:</strong> {user.location || "-"}</p>
            <p><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</p>
          </div>
        )}
        {activeTab === "devices" && <UserDevices user={user} />}
        {activeTab === "entitlements" && <AssignedLicenses user={user} />}
      </div>
    </div>
  );
}
