"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ActivityLogForm = () => {
  const [activityType, setActivityType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientId, setRecipientId] = useState(""); // Text input for now

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here (API call to save data)
    console.log({ activityType, date, time, description, notes, recipientId }); // Placeholder
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="activityType">Activity Type</Label>
        <Select value={activityType} onValueChange={setActivityType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Activity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Meal">Meal</SelectItem>
            <SelectItem value="Walk">Walk</SelectItem>
            <SelectItem value="Therapy">Therapy</SelectItem>
            <SelectItem value="Social Interaction">
              Social Interaction
            </SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      <Button type="submit">Add Activity Log</Button>
    </form>
  );
};

export default ActivityLogForm;
