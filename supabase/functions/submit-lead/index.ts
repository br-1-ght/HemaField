import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadRequest {
  name: string;
  phone: string;
  email: string;
  campaign: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, campaign }: LeadRequest = await req.json();

    // Validate inputs
    if (!name || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide your name" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!phone || phone.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid phone number" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

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

    // Insert subscriber with name
    const { error: insertError } = await supabase
      .from("email_subscribers")
      .upsert(
        { email, name, campaign, source: "tiktok_popup" },
        { onConflict: "email", ignoreDuplicates: false }
      );

    if (insertError) {
      console.error("Insert error:", insertError);
    }

    // Send notification email to owner
    const ownerEmail = "Helen@Hemafieldflowers.com.ng";
    
    const campaignLabel = campaign === "valentine" ? "Valentine Early Access" : 
                          campaign === "tiktok_discount" ? "TikTok Discount" : "Website Discount";
    
    const ownerEmailResponse = await resend.emails.send({
      from: "Hemafield Flowers <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `🌹 New Lead: ${name} (${campaignLabel})`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #f8faf8; padding: 40px; border-radius: 12px; border: 2px solid #166534;">
          <h1 style="color: #166534; text-align: center; margin-bottom: 20px;">New Lead! 🎉</h1>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #374151; font-size: 16px; margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="color: #374151; font-size: 16px; margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #166534;">${phone}</a></p>
            <p style="color: #374151; font-size: 16px; margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #166534;">${email}</a></p>
            <p style="color: #374151; font-size: 16px; margin: 10px 0;"><strong>Campaign:</strong> ${campaignLabel}</p>
          </div>
          <div style="text-align: center;">
            <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-right: 10px;">Message on WhatsApp</a>
            <a href="tel:${phone}" style="display: inline-block; background: #166534; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Call Now</a>
          </div>
          <p style="color: #166534; text-align: center; font-weight: bold; margin-top: 20px;">Follow up soon! 💐</p>
        </div>
      `,
    });

    console.log("Owner notification sent:", ownerEmailResponse);

    // Customer email disabled per request

    return new Response(
      JSON.stringify({ success: true, message: "Lead submitted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Submit lead error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
