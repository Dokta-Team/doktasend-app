import { Loader2 } from "lucide-react";

export const Spinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
            <Loader2 className="animate-spin" style={{ height: '5rem', width: '5rem', color: "#9b59b6" }} />
        </div>
    );
};
