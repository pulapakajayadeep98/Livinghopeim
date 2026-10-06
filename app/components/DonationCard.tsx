import Image from "next/image";

// Same donation details as the Make a Donation section on the home page.
export default function DonationCard() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#241246] to-[#0b1a3a] p-8 text-white shadow-[0_25px_60px_rgba(11,26,58,0.25)] sm:p-12">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
        Support The Ministry
      </p>
      <h3 className="mt-3 text-center font-serif text-2xl font-semibold text-[#f1d27a]">
        Emmanuel Grace Public Charitable Trust
      </h3>

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <h4 className="mb-6 text-sm uppercase tracking-widest text-[#f1d27a]">
            Bank Transfer Details
          </h4>
          <div className="space-y-4 leading-7 text-white/90">
            <p>
              <span className="font-semibold">Bank:</span> Axis Bank
            </p>
            <p>
              <span className="font-semibold">Account Number:</span>{" "}
              924010027158690
            </p>
            <p>
              <span className="font-semibold">IFSC Code:</span> UTIB0001413
            </p>
            <p>
              <span className="font-semibold">Branch:</span> Eluru Road,
              Governorpet, Vijayawada
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm text-white/80">
            For confirmation and receipt, kindly share your transaction details
            to:
            <br />
            <span className="font-semibold text-[#f1d27a]">
              livinghopeorganisation@gmail.com
            </span>
          </div>
        </div>

        <div>
          <h4 className="mb-6 text-sm uppercase tracking-widest text-[#f1d27a]">
            UPI Transfer
          </h4>
          <p className="leading-7 text-white/90">
            <span className="font-semibold">UPI ID:</span> anilpaul7@ybl
          </p>
          <div className="mt-4 w-[180px] rounded-2xl bg-white p-4 shadow-lg">
            <Image
              src="/qr.jpeg"
              alt="Donation QR Code"
              width={220}
              height={220}
              sizes="180px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/70">
        Please verify the Trust name before making any transfer. Emmanuel Grace
        Public Charitable Trust will never request donations through personal
        accounts.
      </div>
    </div>
  );
}
