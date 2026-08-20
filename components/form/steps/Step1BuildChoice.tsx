import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { OrderFormValues } from "@/data/order-form-schema";
import { websitePackages } from "@/data/website-packages";
import { digitalOpsPackages } from "@/data/digital-ops";

export default function Step1BuildChoice() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<OrderFormValues>();
  const branch = useWatch({ control, name: "branch" });
  const tier = useWatch({ control, name: "tier" });
  const [expandedAddOn, setExpandedAddOn] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-rd-text-primary">
          What do you need? <span className="text-rd-purple">*</span>
        </p>
        <Controller
          name="branch"
          control={control}
          render={({ field }) => (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { value: "website", label: "A Website" },
                  { value: "digitalOps", label: "Digital Ops" },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  aria-pressed={field.value === option.value}
                  className={`border p-4 text-left text-sm uppercase tracking-wide transition-colors ${
                    field.value === option.value
                      ? "border-rd-purple bg-rd-purple text-rd-purple-fg"
                      : "border-rd-border text-rd-text-muted hover:border-rd-purple hover:text-rd-text-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.branch && (
          <p className="mt-2 text-xs text-red-400">{errors.branch.message}</p>
        )}
      </div>

      {branch === "website" && (
        <div>
          <p className="text-sm text-rd-text-primary">
            Choose a package <span className="text-rd-purple">*</span>
          </p>
          <Controller
            name="tier"
            control={control}
            render={({ field }) => (
              <div className="mt-3 grid gap-3">
                {websitePackages.map((pkg) => {
                  const isExpanded = expandedAddOn === pkg.name;
                  return (
                    <div
                      key={pkg.name}
                      className={`border p-4 text-left transition-colors ${
                        field.value === pkg.name
                          ? "border-rd-purple"
                          : "border-rd-border hover:border-rd-purple"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => field.onChange(pkg.name)}
                        aria-pressed={field.value === pkg.name}
                        className="block w-full text-left"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="text-sm font-bold text-rd-purple">
                            {pkg.name}
                          </p>
                          <p className="text-lg font-bold text-rd-text-primary">
                            {pkg.price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-rd-text-primary">
                          {pkg.tagline}
                        </p>
                        <p className="mt-1 text-xs text-rd-text-muted">
                          {pkg.description}
                        </p>
                        <ul className="mt-3 grid gap-x-4 gap-y-1 text-xs text-rd-text-muted sm:grid-cols-2">
                          {pkg.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                        <p className="mt-3 text-xs text-rd-purple">{pkg.note}</p>
                      </button>

                      {pkg.addOn && (
                        <div className="mt-3 border-t border-rd-border pt-3">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedAddOn(isExpanded ? null : pkg.name)
                            }
                            className="text-xs font-medium uppercase tracking-wide text-rd-gold transition-colors hover:text-rd-purple"
                          >
                            {isExpanded ? "Read less ←" : "Read more →"}
                          </button>

                          {isExpanded && (
                            <div className="mt-3 space-y-3 text-xs text-rd-text-muted">
                              <p className="text-sm font-bold text-rd-text-primary">
                                Optional Add-On
                              </p>
                              <p>
                                <span className="font-bold text-rd-purple">
                                  Additional Functional / Advanced Page —{" "}
                                  {pkg.addOn.price}
                                </span>
                              </p>
                              <p>{pkg.addOn.intro}</p>
                              <p className="font-semibold text-rd-text-primary">
                                Examples include:
                              </p>
                              <div className="grid gap-3 sm:grid-cols-2">
                                {pkg.addOn.categories.map((category) => (
                                  <div key={category.title}>
                                    <p className="font-semibold text-rd-text-primary">
                                      {category.title}
                                    </p>
                                    <ul className="mt-1 space-y-0.5">
                                      {category.items.map((item) => (
                                        <li key={item}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                              <p>{pkg.addOn.note}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          />
          {errors.tier && (
            <p className="mt-2 text-xs text-red-400">{errors.tier.message}</p>
          )}

          {tier && tier !== "FORGE" && (
            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-2 text-sm text-rd-text-muted">
                <input
                  type="checkbox"
                  {...register("wantsFunctionalAddOn")}
                  className="mt-1"
                />
                I might need a functional page add-on too (store,
                booking, client portal — +$600)
              </label>
              <label className="flex items-start gap-2 text-sm text-rd-text-muted">
                <input
                  type="checkbox"
                  {...register("wantsStandardAddOn")}
                  className="mt-1"
                />
                I might need a standard page add-on too (About,
                Services, Portfolio, etc. — +$200)
              </label>
            </div>
          )}
        </div>
      )}

      {branch === "digitalOps" && (
        <div>
          <p className="text-sm text-rd-text-primary">
            Which Digital Ops type? <span className="text-rd-purple">*</span>
          </p>
          <Controller
            name="digitalOpsType"
            control={control}
            render={({ field }) => (
              <div className="mt-3 grid gap-3">
                {digitalOpsPackages.map((pkg) => {
                  const value = pkg.name.replace(/ /g, "_");
                  return (
                    <button
                      key={pkg.name}
                      type="button"
                      onClick={() => field.onChange(value)}
                      aria-pressed={field.value === value}
                      className={`border p-4 text-left transition-colors ${
                        field.value === value
                          ? "border-rd-purple"
                          : "border-rd-border hover:border-rd-purple"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-sm font-bold text-rd-purple">
                          {pkg.name}
                        </p>
                        <p className="text-lg font-bold text-rd-text-primary">
                          {pkg.price}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-rd-text-primary">
                        {pkg.tagline}
                      </p>
                      <ul className="mt-3 grid gap-x-4 gap-y-1 text-xs text-rd-text-muted sm:grid-cols-2">
                        {pkg.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs text-rd-purple">{pkg.note}</p>
                      {pkg.pricingNote && (
                        <p className="mt-1 text-xs text-rd-text-muted">
                          {pkg.pricingNote}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.digitalOpsType && (
            <p className="mt-2 text-xs text-red-400">
              {errors.digitalOpsType.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
