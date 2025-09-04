"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { post } from "@/lib/http";
import { toast } from "sonner";


export default function OnboardingModal(props) {
    const { open, onClose, fetchDashboardData } = props
    const [recipientId, setRecipientId] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        address: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        const { fullName, mobile, address, email } = formData;
        if (!fullName.trim() || !mobile.trim() || !address.trim()) {
            toast("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            const payload = { fullName: fullName, mobile, address };
            payload.email = "default@gmail.com"
            if (email.trim()) payload.email = email;
            const response = await post("recipient", payload);
            if (response?.success) {
                router.refresh();
                fetchDashboardData();
                onClose();
                // reset form
                setFormData({ fullName: "", mobile: "", address: "", email: "" });
            } else {
                toast(response?.message || "Something went wrong");
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
            // toast(error?.message || "Error with your request", {
            //     description: "Uh oh! Something went wrong.",
            //     action: {
            //         label: "Try again",
            //         onClick: () => handleSubmit(),
            //     },
            // })
        }
    };


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Recipient Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                    {/* <Input
                        placeholder="e.g. ABC123"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                    /> */}

                    <Input
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <Input
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                    <Input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <Input
                        name="email"
                        placeholder="Email (optional)"
                        required={false}
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {/* <Button onClick={handleSubmit} disabled={loading || !recipientId}>
                        {loading ? "Submitting..." : "Submit"}
                    </Button> */}
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            loading ||
                            !formData.fullName.trim() ||
                            !formData.mobile.trim() ||
                            !formData.address.trim()
                        }
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
