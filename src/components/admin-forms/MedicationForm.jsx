"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const MedicationForm = () => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [route, setRoute] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientId, setRecipientId] = useState(""); // Text input for now

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here (API call to save data)
    console.log({ name, dosage, frequency, route, notes, recipientId }); // Placeholder
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="name">Medication Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="dosage">Dosage</Label>
        <Input
          type="text"
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="frequency">Frequency</Label>
        <Input
          type="text"
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="route">Route</Label>
        <Input
          type="text"
          id="route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="recipientId">Recipient ID</Label>
        <Input
          type="text"
          id="recipientId"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
      </div>
      <Button type="submit">Add Medication</Button>
    </form>
  );
};

export default MedicationForm;
