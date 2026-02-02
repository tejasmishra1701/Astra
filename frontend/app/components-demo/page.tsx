'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Tooltip from '@/components/ui/Tooltip';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/button';
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonStat } from '@/components/ui/skeleton';
import EmptyState from '@/components/EmptyState';

export default function ComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      <div>
        <h1 className="text-3xl font-bold font-mono text-accent-primary mb-2">
          Component Library Demo
        </h1>
        <p className="text-terminal-muted font-mono">
          Showcase of all ASTRA UI components
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="error">Error Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </section>

      {/* Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="font-mono text-terminal-text">
              This is a modal dialog with backdrop blur and smooth animations.
            </p>
            <p className="font-mono text-terminal-muted text-sm">
              Press ESC or click outside to close.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* Tooltips */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Tooltips</h2>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="This is a top tooltip" position="top">
            <Button variant="outline">Hover me (Top)</Button>
          </Tooltip>
          <Tooltip content="This is a bottom tooltip" position="bottom">
            <Button variant="outline">Hover me (Bottom)</Button>
          </Tooltip>
          <Tooltip content="This is a left tooltip" position="left">
            <Button variant="outline">Hover me (Left)</Button>
          </Tooltip>
          <Tooltip content="This is a right tooltip" position="right">
            <Button variant="outline">Hover me (Right)</Button>
          </Tooltip>
        </div>
      </section>

      {/* Toast Notifications */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Toast Notifications</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => showToast('Success message!', 'success')}>
            Show Success
          </Button>
          <Button onClick={() => showToast('Error occurred!', 'error')}>
            Show Error
          </Button>
          <Button onClick={() => showToast('Warning message!', 'warning')}>
            Show Warning
          </Button>
          <Button onClick={() => showToast('Info message!', 'info')}>
            Show Info
          </Button>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Progress Bars</h2>
        <div className="space-y-6">
          <ProgressBar value={75} label="Default Progress" showLabel />
          <ProgressBar value={60} variant="gradient" label="Gradient Progress" showLabel />
          <ProgressBar value={90} variant="success" label="Success Progress" showLabel />
          <ProgressBar value={45} variant="warning" label="Warning Progress" showLabel />
          <ProgressBar value={30} variant="error" label="Error Progress" showLabel />
        </div>
      </section>

      {/* Skeletons */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Loading Skeletons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-mono text-terminal-muted mb-2">Skeleton Card</h3>
            <SkeletonCard />
          </div>
          <div>
            <h3 className="text-sm font-mono text-terminal-muted mb-2">Skeleton Table</h3>
            <SkeletonTable rows={3} />
          </div>
          <div>
            <h3 className="text-sm font-mono text-terminal-muted mb-2">Skeleton Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </div>
          </div>
        </div>
      </section>

      {/* Empty State */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-mono text-terminal-text">Empty State</h2>
        <div className="bg-terminal-panel border border-terminal-border rounded-lg">
          <EmptyState
            icon="🎨"
            title="No Data Available"
            description="This is an example of an empty state component with a call-to-action button."
            action={{
              label: 'Create Something',
              onClick: () => showToast('Action clicked!', 'info'),
            }}
          />
        </div>
      </section>
    </div>
  );
}
