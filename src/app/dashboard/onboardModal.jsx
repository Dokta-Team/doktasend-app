"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { post } from "@/lib/http";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";


const genders = [
    { name: "Select Gender", value: "" },
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" }
]


export default function OnboardingModal(props) {
    const { open, onClose, fetchDashboardData } = props
    const [recipientId, setRecipientId] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        address: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        medicalHistory: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name", name, "value", value);
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        console.log("formData", formData);
        const { fullName, mobile, address, email, gender, dateOfBirth, medicalHistory } = formData;
        if (!fullName.trim() || !mobile.trim() || !address.trim() || !gender.trim() || !dateOfBirth.trim() || !medicalHistory.trim()) {
            toast("Please fill in all required fields");
            return;
        }
        setLoading(true);
        try {
            const payload = { fullName: fullName, mobile, address, gender, dateOfBirth, medicalHistory };
            payload.email = "default@gmail.com"
            if (email.trim()) payload.email = email.toLowerCase();
            const response = await post("recipient", payload);
            if (response?.success) {
                router.refresh();
                fetchDashboardData();
                onClose();
                // reset form
                setFormData({ fullName: "", mobile: "", address: "", email: "", gender: "", dateOfBirth: "", medicalHistory: "" });
            } else {
                toast(response?.message || "Something went wrong");
                setLoading(false);
            }
        } catch (error) {
            toast(error?.message || "Error with your request", {
                description: "Uh oh! Something went wrong.",
                action: {
                    label: "Try again",
                    onClick: () => handleSubmit(),
                },
            })
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="overflow-y-auto max-h-[95vh]">
                <DialogHeader>
                    <DialogTitle>Enter Recipient Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Full Name</Label>
                        <Input
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Mobile</Label>
                        <Input
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Address</Label>
                        <Input
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Email (optional)</Label>
                        <Input
                            name="email"
                            placeholder="Email (optional)"
                            required={false}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Date of Birth</Label>
                        <Input
                            name="dateOfBirth"
                            placeholder="Date of Birth"
                            required={true}
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Gender</Label>

                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="px-3 py-2 border rounded-md text-sm w-full"
                        >
                            {genders.map((gender) => (
                                <option key={gender.value} value={gender.value}>
                                    {gender.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2 text-muted-foreground">
                        <Label htmlFor="country">Medical History</Label>

                        <textarea
                            id="medicalHistory"
                            name="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={handleChange}
                            className="px-3 py-2 border rounded-md text-sm w-full"
                        >
                        </textarea>
                    </div>
                    {/* <Button onClick={handleSubmit} disabled={loading || !recipientId}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button> */}
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            loading ||
                            !formData.fullName.trim() ||
                            !formData.mobile.trim() ||
                            !formData.address.trim() ||
                            !formData.gender.trim() ||
                            !formData.dateOfBirth.trim()
                        }
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
