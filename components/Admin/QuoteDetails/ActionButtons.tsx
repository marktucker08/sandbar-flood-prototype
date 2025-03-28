import React, { useState } from "react";
import { DetailedQuote } from "@/types/admin";
import { Button } from "@/components/ui";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface ActionButtonsProps {
  data: DetailedQuote;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const handleRejectQuote = () => {
    setDialogConfig({
      title: "Reject Quote",
      description: "Are you sure you want to reject this quote? This action cannot be undone.",
      onConfirm: () => {
        // Handle reject quote action
        console.log("Rejecting quote:", data.id);
      },
    });
    setDialogOpen(true);
  };

  const getActionButtons = () => {
    switch (data.status) {
      case "pending":
        return (
          <>
            <Button variant="default" className="bg-blue-400 hover:bg-blue-500 text-white">
              Approve Quote
            </Button>
            <Button 
              variant="default" 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleRejectQuote}
            >
              Reject Quote
            </Button>
          </>
        );
      case "approved":
        return (
          <Button variant="default" className="bg-[#0066CC] hover:bg-[#003366]">
            Convert to Policy
          </Button>
        );
      case "rejected":
        return (
          <Button variant="default" className="bg-[#FF9900] hover:bg-[#E68A00]">
            Create New Quote
          </Button>
        );
      case "expired":
        return (
          <Button variant="default" className="bg-[#0066CC] hover:bg-[#003366]">
            Renew Quote
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="admin-action-buttons mt-6">
        <Button variant="secondary" className="border-[#003366] text-[#003366] hover:bg-[#E6F2FF]">
          Edit Quote
        </Button>
        <Button variant="secondary" className="border-[#003366] text-[#003366] hover:bg-[#E6F2FF]">
          Print Quote
        </Button>
        {getActionButtons()}
      </div>

      {dialogConfig && (
        <ConfirmationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={dialogConfig.title}
          description={dialogConfig.description}
          onConfirm={dialogConfig.onConfirm}
          variant="destructive"
        />
      )}
    </>
  );
};

export default ActionButtons;
