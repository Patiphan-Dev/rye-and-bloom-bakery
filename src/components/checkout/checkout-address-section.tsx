interface CheckoutAddressSectionProps {
  fullName: string;
  phone: string;
  address: string;
  onFullNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export function CheckoutAddressSection({
  fullName,
  phone,
  address,
  onFullNameChange,
  onPhoneChange,
  onAddressChange,
}: CheckoutAddressSectionProps) {
  return (
    <section className="rounded-2xl border border-ink/10 bg-card p-5">
      <h2 className="font-heading text-lg text-ink">ข้อมูลผู้รับสินค้า</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-ink">
            ชื่อ-นามสกุล
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(event) => onFullNameChange(event.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">
            เบอร์โทรศัพท์
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="mb-1 block text-sm font-medium text-ink">
            ที่อยู่จัดส่ง
          </label>
          <textarea
            id="address"
            required
            rows={3}
            value={address}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
            className="w-full rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}
