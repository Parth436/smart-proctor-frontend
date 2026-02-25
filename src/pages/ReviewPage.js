import React from "react";

export default function ReviewPage() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Proctor Review Panel</h2>
      <p>AI Flags:</p>
      <ul>
        <li>No face detected: 0</li>
        <li>Multiple faces: 0</li>
        <li>Tab switches: 1</li>
      </ul>
    </div>
  );
}
