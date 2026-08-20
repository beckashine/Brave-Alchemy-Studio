"use client";

import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  orderFormSchema,
  type OrderFormValues,
  defaultValues,
  getActiveSteps,
} from "@/data/order-form-schema";
import BorderedCard from "@/components/ui/BorderedCard";
import SectionLabel from "@/components/ui/SectionLabel";
import WizardButton from "@/components/form/WizardButton";
import ConfirmationScreen from "@/components/form/ConfirmationScreen";
import Step1BuildChoice from "@/components/form/steps/Step1BuildChoice";
import Step2ClientInfo from "@/components/form/steps/Step2ClientInfo";
import Step3BusinessGoals from "@/components/form/steps/Step3BusinessGoals";
import Step4ExistingAssets from "@/components/form/steps/Step4ExistingAssets";
import Step5DesignDirection from "@/components/form/steps/Step5DesignDirection";
import Step6FunctionalRequirements from "@/components/form/steps/Step6FunctionalRequirements";
import Step7Timeline from "@/components/form/steps/Step7Timeline";
import Step8Review from "@/components/form/steps/Step8Review";
import type { StepId } from "@/data/order-form-schema";

const stepComponents: Record<StepId, () => React.JSX.Element> = {
  build: Step1BuildChoice,
  client: Step2ClientInfo,
  goals: Step3BusinessGoals,
  assets: Step4ExistingAssets,
  design: Step5DesignDirection,
  functional: Step6FunctionalRequirements,
  timeline: Step7Timeline,
  review: Step8Review,
};

export default function StepWizard({
  initialBranch,
}: {
  initialBranch?: OrderFormValues["branch"];
}) {
  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: initialBranch
      ? { ...defaultValues, branch: initialBranch }
      : defaultValues,
    mode: "onTouched",
  });
  const { control, trigger, handleSubmit } = methods;
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const branch = useWatch({ control, name: "branch" });
  const tier = useWatch({ control, name: "tier" });
  const wantsFunctionalAddOn = useWatch({ control, name: "wantsFunctionalAddOn" });
  const activeSteps = getActiveSteps({ branch, tier, wantsFunctionalAddOn });
  const currentStep = activeSteps[stepIndex];
  const isLastStep = stepIndex === activeSteps.length - 1;
  const StepComponent = stepComponents[currentStep.id];

  async function handleNext() {
    const valid = await trigger(currentStep.fields);
    if (valid) setStepIndex((i) => Math.min(i + 1, activeSteps.length - 1));
  }

  function handleBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function onSubmit(data: OrderFormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <ConfirmationScreen />;

  return (
    <BorderedCard className="p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <SectionLabel>{currentStep.title}</SectionLabel>
        <p className="font-rd-mono text-xs text-rd-text-muted">
          Step {stepIndex + 1} of {activeSteps.length}
        </p>
      </div>

      <div className="mt-3 h-1 w-full bg-rd-border">
        <div
          className="h-1 bg-rd-purple transition-all duration-300"
          style={{
            width: `${((stepIndex + 1) / activeSteps.length) * 100}%`,
          }}
        />
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={isLastStep ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
          className="mt-8"
        >
          <StepComponent />

          {submitError && (
            <p className="mt-6 border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-400">
              {submitError}
            </p>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-rd-border pt-6">
            <WizardButton
              onClick={handleBack}
              disabled={stepIndex === 0}
              className={stepIndex === 0 ? "invisible" : ""}
            >
              BACK
            </WizardButton>

            {isLastStep ? (
              <WizardButton type="submit" variant="solid" disabled={submitting}>
                {submitting ? "SENDING..." : "SUBMIT PROJECT REQUEST"}
              </WizardButton>
            ) : (
              <WizardButton onClick={handleNext} variant="solid">
                NEXT
              </WizardButton>
            )}
          </div>
        </form>
      </FormProvider>
    </BorderedCard>
  );
}
