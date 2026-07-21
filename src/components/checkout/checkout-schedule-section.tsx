import type { FulfillmentMethod } from "@/types/order";
import { fulfillmentOptions, timeSlots } from "@/lib/mock-data/checkout-options";
import { RadioOptionCard } from "@/components/ui/radio-option-card";

interface CheckoutScheduleSectionProps {
  fulfillmentMethod: FulfillmentMethod;
  scheduledDate: string;
  scheduledTimeSlot: string;
  minDate: string;
  onFulfillmentChange: (value: FulfillmentMethod) => void;
  onDateChange: (value: string) => void;
  onTimeSlotChange: (value: string) => void;
}

export function CheckoutScheduleSection({
  fulfillmentMethod,
  scheduledDate,
  scheduledTimeSlot,
  minDate,
  onFulfillmentChange,
  onDateChange,
  onTimeSlotChange,
}: CheckoutScheduleSectionProps) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-card p-5">
      <h2 className="font-heading text-lg text-ink">วิธีจัดส่งและเวลานัดรับ</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fulfillmentOptions.map((option) => (
          <RadioOptionCard
            key={option.value}
            name="fulfillmentMethod"
            value={option.value}
            label={option.label}
            description={option.description}
            checked={fulfillmentMethod === option.value}
            onChange={(value) => onFulfillmentChange(value as FulfillmentMethod)}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="scheduledDate" className="mb-1 block text-sm font-medium text-ink">
            วันที่ต้องการรับสินค้า
          </label>
          <input
            id="scheduledDate"
            type="date"
            required
            min={minDate}
            value={scheduledDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="scheduledTimeSlot" className="mb-1 block text-sm font-medium text-ink">
            ช่วงเวลาที่ต้องการรับสินค้า
          </label>
          <select
            id="scheduledTimeSlot"
            required
            value={scheduledTimeSlot}
            onChange={(event) => onTimeSlotChange(event.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
          >
            <option value="" disabled>
              เลือกช่วงเวลา
            </option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
