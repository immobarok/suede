"use client";

import { useState } from "react";
import { testIpHashAction } from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TestIpPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleTest() {
    try {
      setLoading(true);
      const res = await testIpHashAction();

      if (res.success) {
        setResult(res.data);
        toast.success(
          "Successfully generated IP hash and stored click record!",
        );
      } else {
        toast.error(res.error || "Failed to test IP hash");
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred",
        error instanceof Error ? { description: error.message } : undefined,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">IP Hash Tester</CardTitle>
          <CardDescription>
            Test the affiliate click IP hashing logic. This will capture your
            machine&apos;s IP, hash it securely, and insert a dummy click record
            into the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleTest}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Testing..." : "Run IP Hash Test"}
          </Button>

          {result && (
            <div className="bg-muted border-border mt-8 space-y-4 rounded-lg border p-4">
              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Raw IP Detected
                </h3>
                <code className="bg-background relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {result.rawIp}
                </code>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Generated IP Hash
                </h3>
                <code className="bg-background text-primary relative block rounded border p-3 font-mono text-xs break-all sm:text-sm">
                  {result.ipHash}
                </code>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Database Record (affiliate_clicks)
                </h3>
                <pre className="bg-background relative overflow-x-auto rounded border p-4 font-mono text-xs">
                  {JSON.stringify(result.clickRecord, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
