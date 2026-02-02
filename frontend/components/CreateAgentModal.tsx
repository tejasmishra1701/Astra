"use client";

import { useState } from "react";
import { X, Bot, Loader2 } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/button";
import { useToast } from "./ui/Toast";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (agentName: string) => void;
}

export default function CreateAgentModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateAgentModalProps) {
  const [agentName, setAgentName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { showToast } = useToast();

  const handleCreate = async () => {
    if (!agentName.trim()) {
      showToast("Please enter an agent name", "error");
      return;
    }

    // Validate agent name (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(agentName)) {
      showToast(
        "Agent name can only contain lowercase letters, numbers, and hyphens",
        "error",
      );
      return;
    }

    setIsCreating(true);

    try {
      // TODO: Implement ENS subname registration
      // This would call the ENS Subname Factory contract
      // For now, simulate the creation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showToast(
        `Agent ${agentName}.astra.eth created successfully!`,
        "success",
      );
      onSuccess?.(agentName);
      onClose();
      setAgentName("");
    } catch (error) {
      showToast("Failed to create agent. Please try again.", "error");
      console.error("Error creating agent:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setAgentName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-accent-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-terminal-text">
                Create New Agent
              </h2>
              <p className="text-sm text-terminal-muted">
                Deploy your AI trading agent
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Agent Name Input */}
          <div>
            <label className="block text-sm font-mono text-terminal-text mb-2">
              Agent Name
            </label>
            <div className="relative">
              <Input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value.toLowerCase())}
                placeholder="my-agent"
                disabled={isCreating}
                className="pr-32"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono text-terminal-muted">
                .astra.eth
              </div>
            </div>
            <p className="text-xs text-terminal-muted mt-2">
              Choose a unique name for your agent. Only lowercase letters,
              numbers, and hyphens allowed.
            </p>
          </div>

          {/* Preview */}
          {agentName && (
            <div className="p-4 bg-terminal-panel rounded-lg border border-terminal-border">
              <div className="text-xs text-terminal-muted mb-1">
                Your agent will be created as:
              </div>
              <div className="text-lg font-mono text-accent-primary">
                {agentName}.astra.eth
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-accent-primary/5 rounded-lg border border-accent-primary/20">
            <h3 className="text-sm font-bold text-terminal-text mb-2">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-terminal-muted">
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-0.5">1.</span>
                <span>ENS subname will be registered on-chain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-0.5">2.</span>
                <span>You'll need to deposit fuel (USDC/ETH) for trading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-0.5">3.</span>
                <span>Set your policy rules in the Agent Passport</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-primary mt-0.5">4.</span>
                <span>Start trading with zero gas fees!</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isCreating}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleCreate}
              disabled={isCreating || !agentName.trim()}
              className="flex-1"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Agent"
              )}
            </Button>
          </div>

          {/* Gas Fee Notice */}
          <div className="text-xs text-terminal-muted text-center">
            This is a one-time gas fee. All future trades will be gas-free via
            Yellow Network.
          </div>
        </div>
      </div>
    </Modal>
  );
}
