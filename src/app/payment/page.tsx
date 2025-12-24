"use client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const participantId = searchParams.get("id");

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!participantId) {
    }
  }, [participantId]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId, amount: 400 }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Euro Rotary Event",
        description: "Event Registration Fee",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                participantId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push(`/confirmation?bib=${verifyData.bib}`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Verification error.");
          }
        },
        theme: {
          color: "#D4AF37",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error(err);
      alert("Failed to initiate payment.");
      setIsProcessing(false);
    }
  };

  if (!participantId) {
    return (
      <div className="text-center text-luxury-silver">
        <p>No Participant ID found.</p>
        <Button
          onClick={() => router.push("/register")}
          variant="outline"
          className="mt-4"
        >
          Go to Registration
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
      <h1 className="text-2xl font-display text-luxury-gold mb-6">
        Complete Registration
      </h1>

      <div className="bg-luxury-black p-6 rounded-xl border border-white/5 mb-8 text-left">
        <div className="flex justify-between items-end mb-2">
          <p className="text-luxury-silver text-sm uppercase tracking-wider">
            Registration Fee
          </p>
          <p className="text-3xl text-white font-bold font-display">₹400.00</p>
        </div>
        <div className="h-[1px] w-full bg-white/10 my-4" />
        <p className="text-xs text-luxury-silver/60">
          Includes full event access, welcome kit, and gala dinner.
        </p>
      </div>

      <Button
        onClick={handlePayment}
        isLoading={isProcessing}
        className="w-full mb-4"
        size="lg"
      >
        Pay Securely
      </Button>
      <p className="text-[10px] text-luxury-silver/40 uppercase tracking-widest">
        Secured by Razorpay
      </p>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-luxury-black bg-[url('/hero-bg.png')] bg-cover bg-fixed relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-0" />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto px-6 flex items-center justify-center">
          <Suspense
            fallback={<div className="text-white">Loading payment...</div>}
          >
            <PaymentContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
