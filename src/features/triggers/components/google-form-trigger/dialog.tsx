import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { generateGoogleFormScript } from "./utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoogleFormTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/workflows/google-form?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy webhook URL to clipboard.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Form Trigger</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your Google Form's App Script to trigger the
            workflow upon form submission.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                <CopyIcon />
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <h4 className="font-medium text-sm">Google Apps Script:</h4>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                const script = generateGoogleFormScript(webhookUrl);
                try {
                  await navigator.clipboard.writeText(script);
                  toast.success("Google App Script copied to clipboard!");
                } catch (error) {
                  toast.error("Failed to copy Google App Script to clipboard.");
                }
              }}
            >
              <CopyIcon className="size-4" />
              <span className="ml-2">Copy Google App Script</span>
            </Button>
            <p className="text-muted-foreground text-xs">
              Note: Make sure to replace the placeholder URL in the script with
              the webhook URL provided above.
            </p>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <h4 className="font-medium text-sm">Available Variables</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <code>{"{{googleForm.respondentEmail}}"}</code> - Respondent
                Email
              </li>
              <li>
                <code>{"{{googleForm.responses['Question Name']}}"}</code>-
                Specific answer
              </li>
              <li>
                <code>{"{{json googleForm.responses}}"}</code> - All responses
                as JSON
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
