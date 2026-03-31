import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SignupProvider } from "@/contexts/SignupContext";
import type { Plan } from "@/types/plans";
import type { SignupMode } from "@/types/signup";
import SignupFlowContent from "./SignupFlowContent";

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: Plan | null;
  mode?: SignupMode;
}

const SignupDialog = ({ isOpen, onClose, initialPlan, mode = "purchase" }: SignupDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">
          {mode === "trial" ? "Testar CRM AGENTPRO Grátis" : "Contratar CRM AGENTPRO"}
        </DialogTitle>
        <SignupProvider>
          <SignupFlowContent initialPlan={initialPlan} onClose={onClose} mode={mode} />
        </SignupProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
