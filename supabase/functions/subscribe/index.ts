import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
  campaign: "discount" | "valentine";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, campaign }: SubscribeRequest = await req.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert subscriber
    const { error: insertError } = await supabase
      .from("email_subscribers")
      .upsert(
        { email, campaign, source: "popup" },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (insertError) {
      console.error("Insert error:", insertError);
      // If duplicate, still send success (they're already subscribed)
      if (!insertError.message.includes("duplicate")) {
        throw insertError;
      }
    }

    // Send confirmation email
    const isDiscount = campaign === "discount";
    const subject = isDiscount 
      ? "🌸 Your ₦2,000 Discount is Ready!" 
      : "💐 You're on the Valentine's Early Access List!";
    
    const html = isDiscount 
      ? `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fdf2f8 0%, #fff 100%); padding: 40px; border-radius: 12px;">
          <h1 style="color: #166534; text-align: center; margin-bottom: 20px;">Welcome to Hema Field Flowers! 🌹</h1>
          <p style="color: #374151; font-size: 18px; line-height: 1.6;">Thank you for subscribing! Your exclusive <strong style="color: #166534;">₦2,000 discount</strong> is waiting for you.</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">Use code <strong style="background: #166534; color: white; padding: 4px 12px; border-radius: 4px;">HEMA2000</strong> at checkout on your first order.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">With love,<br/>The Hema Field Flowers Team</p>
        </div>
      `
      : `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fdf2f8 0%, #fff 100%); padding: 40px; border-radius: 12px;">
          <h1 style="color: #166534; text-align: center; margin-bottom: 20px;">You're on the List! 💕</h1>
          <p style="color: #374151; font-size: 18px; line-height: 1.6;">Valentine deliveries sell out fast, but you won't miss out!</p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6;">You'll get <strong style="color: #166534;">early access</strong> and <strong style="color: #166534;">priority delivery slots</strong> before everyone else.</p>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">With love,<br/>The Hema Field Flowers Team</p>
        </div>
      `;

    const emailResponse = await resend.emails.send({
      from: "Hema Field Flowers <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
