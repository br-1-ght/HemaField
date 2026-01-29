import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmailPopup } from "@/components/EmailPopup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function PopupDemo() {
  const [showDiscount, setShowDiscount] = useState(false);
  const [showValentine, setShowValentine] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const widgetUrl = typeof window !== "undefined" 
    ? `${window.location.origin}` 
    : "https://your-lovable-app.lovable.app";

  const embedCode = `<!-- Hema Field Flowers Email Popup Widget -->
<script>
(function() {
  var iframe = document.createElement('iframe');
  iframe.src = '${widgetUrl}/widget';
  iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:999999;pointer-events:none;background:transparent;';
  iframe.id = 'hema-popup';
  iframe.setAttribute('allowtransparency', 'true');
  document.body.appendChild(iframe);
  
  // Enable pointer events when popup is active
  window.addEventListener('message', function(e) {
    if (e.data === 'hema-popup-active') iframe.style.pointerEvents = 'auto';
    if (e.data === 'hema-popup-closed') iframe.style.pointerEvents = 'none';
  });
})();
</script>`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-romantic">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-4">
            Hema Field Flowers
          </h1>
          <p className="font-display text-xl italic text-sage">
            Email Capture Popup Widget
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            onClick={() => {
              localStorage.removeItem("hema-popup-discount");
              setShowDiscount(true);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold h-12 px-8"
          >
            Preview Discount Popup
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("hema-popup-valentine");
              setShowValentine(true);
            }}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-body font-semibold h-12 px-8"
          >
            Preview Valentine Popup
          </Button>
        </div>

        {/* Instructions */}
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">
                How to Add to Your WordPress Site
              </CardTitle>
              <CardDescription className="font-body">
                Follow these steps to embed the popup on hemafieldflowers.com.ng
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-body font-semibold text-foreground">
                  Step 1: Configure your Resend email
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Make sure you've verified your domain at{" "}
                  <a 
                    href="https://resend.com/domains" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline hover:no-underline inline-flex items-center gap-1"
                  >
                    resend.com/domains
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  {" "}to send emails from your own domain.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-body font-semibold text-foreground">
                  Step 2: Add the embed code to WordPress
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Go to WordPress Admin → Appearance → Theme Editor → header.php (or use a plugin like "Insert Headers and Footers")
                </p>
                <div className="relative">
                  <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-xs font-mono text-foreground">
                    {embedCode}
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(embedCode, "embed")}
                  >
                    {copiedId === "embed" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-body font-semibold text-foreground">
                  Step 3: Publish your Lovable app
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  Click "Publish" in Lovable to deploy your widget. The popup will appear on your WordPress site after a 3-second delay.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">
                Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Beautiful responsive popups matching your brand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Auto-sends confirmation emails via Resend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Stores subscribers in database (export anytime)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Shows only once per visitor (remembers dismissal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Configurable delay before showing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Popups */}
        {showDiscount && (
          <EmailPopup 
            variant="discount" 
            delayMs={0}
            onClose={() => setShowDiscount(false)} 
          />
        )}
        {showValentine && (
          <EmailPopup 
            variant="valentine" 
            delayMs={0}
            onClose={() => setShowValentine(false)} 
          />
        )}
      </div>
    </div>
  );
}
