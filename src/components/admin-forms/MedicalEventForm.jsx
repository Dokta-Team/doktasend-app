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

const MedicalEventForm = () => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [recipientId, setRecipientId] = useState(""); // For now, text input

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here (API call to save data)
    console.log({ type, date, time, status, notes, recipientId }); // Placeholder
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="type">Type</Label>
        <Input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
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
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
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
      <Button type="submit">Add Medical Event</Button>
    </form>
  );
};

export default MedicalEventForm;
