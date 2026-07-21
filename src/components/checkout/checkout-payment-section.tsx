import type { PaymentMethod } from "@/types/order";
import { paymentOptions } from "@/lib/mock-data/checkout-options";
import { RadioOptionCard } from "@/components/ui/radio-option-card";

interface CheckoutPaymentSectionProps {
  paymentMethod: PaymentMethod;
  notes: string;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onNotesChange: (value: string) => void;
}

export function CheckoutPaymentSection({
  paymentMethod,
  notes,
  onPaymentMethodChange,
  onNotesChange,
}: CheckoutPaymentSectionProps) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-card p-5">
      <h2 className="font-heading text-lg text-ink">วิธีชำระเงิน</h2>
      <div className="mt-4 grid gap-3">
        {paymentOptions.map((option) => (
          <RadioOptionCard
            key={option.value}
            name="paymentMethod"
            value={option.value}
            label={option.label}
            description={option.description}
            checked={paymentMethod === option.value}
            onChange={(value) => onPaymentMethodChange(value as PaymentMethod)}
          />
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-ink">
          หมายเหตุเพิ่มเติม (ถ้ามี)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="เช่น ข้อความบนเค้ก, ความต้องการพิเศษ, จุดสังเกตสถานที่จัดส่ง"
          className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
        />
      </div>
    </section>
  );
}
