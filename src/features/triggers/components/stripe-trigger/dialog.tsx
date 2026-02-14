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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StripeTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/stripe?workflowId=${workflowId}`;

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
          <DialogTitle>Stripe Trigger</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your Stripe's webhook settings to trigger
            the workflow upon payment events.
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
            <h4 className="font-medium text-sm">Stripe Webhook Script:</h4>
            <Button type="button" variant="outline" onClick={async () => {}}>
              <CopyIcon className="size-4" />
              <span className="ml-2">Copy Stripe Webhook Script</span>
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
                <code>{"{{stripe.amount}}"}</code> - Event Amount
              </li>
              <li>
                <code>{"{{stripe.customerId}}"}</code> - Customer ID Object
              </li>
              <li>
                <code>{"{{stripe.eventType}}"}</code> - Event Type
              </li>
              <li>
                <code>{"{{json stripe}}"}</code> - All event data as JSON
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
