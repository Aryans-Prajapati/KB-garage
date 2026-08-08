"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-surface-container -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => onStepClick && onStepClick(step.id)}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                  isCompleted &&
                  "bg-tertiary border-tertiary text-white shadow-sm",
                  isActive &&
                  "bg-secondary border-secondary text-on-secondary ring-4 ring-secondary/20 shadow-md",
                  !isCompleted &&
                  !isActive &&
                  "bg-surface-container-lowest border-outline-variant text-on-surface-variant group-hover:border-secondary/50"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                  isActive && "text-secondary font-bold",
                  isCompleted && "text-tertiary",
                  !isCompleted && !isActive && "text-on-surface-variant"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
